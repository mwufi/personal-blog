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

// Helper function to get user input
function getUserInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
        process.stdout.write(prompt)
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim())
        })
    })
}

async function deleteUser(email: string) {
    console.log(`🔍 Looking for user with email: ${email}`)

    try {
        // First, get the user by email
        const { data: users, error: listError } = await supabase.auth.admin.listUsers()

        if (listError) {
            console.error('❌ Error fetching users:', listError.message)
            return false
        }

        const user = users.users.find(u => u.email === email)

        if (!user) {
            console.error(`❌ No user found with email: ${email}`)
            return false
        }

        console.log(`\n📋 Found user:`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Created: ${user.created_at}`)
        console.log(`   Email confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`)
        console.log(`   Last sign in: ${user.last_sign_in_at || 'Never'}`)

        // Interactive confirmation
        console.log(`\n⚠️  WARNING: This will permanently delete the user and all associated data!`)
        console.log(`   This action cannot be undone!`)

        const confirmation1 = await getUserInput(`\nType the user's email to confirm deletion: `)

        if (confirmation1 !== email) {
            console.log('❌ Email confirmation does not match. Deletion cancelled.')
            return false
        }

        const confirmation2 = await getUserInput(`Type "DELETE" (all caps) to proceed: `)

        if (confirmation2 !== 'DELETE') {
            console.log('❌ Confirmation phrase does not match. Deletion cancelled.')
            return false
        }

        console.log(`\n🗑️  Deleting user...`)

        // Delete the user (this will also cascade delete the profile due to our foreign key)
        const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)

        if (deleteError) {
            console.error('❌ Error deleting user:', deleteError.message)
            return false
        }

        console.log(`✅ Successfully deleted user: ${email}`)
        console.log(`   User ID ${user.id} has been removed from the database`)
        console.log(`   Associated profile data has been automatically deleted`)

        return true

    } catch (error) {
        console.error('❌ Unexpected error:', error)
        return false
    }
}

async function main() {
    // Enable stdin
    process.stdin.setEncoding('utf8')

    // Get email from command line arguments
    const email = process.argv[2]

    if (!email) {
        console.error('❌ Usage: bun scripts/delete_user_safe.ts <email>')
        console.error('')
        console.error('Example:')
        console.error('   bun scripts/delete_user_safe.ts user@example.com')
        process.exit(1)
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        console.error(`❌ Invalid email format: ${email}`)
        process.exit(1)
    }

    console.log('🚀 Supabase User Deletion Script (Safe Mode)')
    console.log('===========================================')

    const success = await deleteUser(email)

    if (success) {
        console.log('\n🎉 User deletion completed successfully!')
    } else {
        console.log('\n💥 User deletion failed or was cancelled!')
    }

    // Close stdin
    process.stdin.destroy()
    process.exit(success ? 0 : 1)
}

// Run the script
main().catch((error) => {
    console.error('💥 Script failed:', error)
    process.stdin.destroy()
    process.exit(1)
})