#!/usr/bin/env bun

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL')
    console.error('   SUPABASE_SERVICE_ROLE_KEY')
    console.error('')
    console.error('Make sure your .env.local file is properly configured.')
    process.exit(1)
}

// Create admin client with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function listUsers() {
    try {
        console.log('🔍 Fetching all users...')

        const { data: users, error } = await supabase.auth.admin.listUsers()

        if (error) {
            console.error('❌ Error fetching users:', error.message)
            return false
        }

        if (users.users.length === 0) {
            console.log('📭 No users found in the database.')
            return true
        }

        console.log(`\n👥 Found ${users.users.length} user(s):\n`)

        users.users.forEach((user, index) => {
            console.log(`${index + 1}. 📧 ${user.email}`)
            console.log(`   🆔 ID: ${user.id}`)
            console.log(`   📅 Created: ${new Date(user.created_at).toLocaleString()}`)
            console.log(`   ✅ Email confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`)
            console.log(`   🔐 Last sign in: ${user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}`)
            console.log(`   📱 Phone: ${user.phone || 'Not set'}`)

            if (user.app_metadata && Object.keys(user.app_metadata).length > 0) {
                console.log(`   🏷️  App metadata: ${JSON.stringify(user.app_metadata)}`)
            }

            if (user.user_metadata && Object.keys(user.user_metadata).length > 0) {
                console.log(`   📝 User metadata: ${JSON.stringify(user.user_metadata)}`)
            }

            console.log('')
        })

        // Also show pagination info if there are more users
        if (users.total && users.total > users.users.length) {
            console.log(`📊 Showing ${users.users.length} of ${users.total} total users`)
            console.log('   (Use pagination parameters to see more)')
        }

        return true

    } catch (error) {
        console.error('❌ Unexpected error:', error)
        return false
    }
}

async function main() {
    console.log('🚀 Supabase User List')
    console.log('====================')

    const success = await listUsers()

    if (success) {
        console.log('✅ User list retrieved successfully!')
        process.exit(0)
    } else {
        console.log('💥 Failed to retrieve user list!')
        process.exit(1)
    }
}

// Run the script
main().catch((error) => {
    console.error('💥 Script failed:', error)
    process.exit(1)
}) 