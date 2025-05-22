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

        console.log(`📋 Found user:`)
        console.log(`   ID: ${user.id}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Created: ${user.created_at}`)
        console.log(`   Email confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`)

        // Confirm deletion
        console.log(`\n⚠️  Are you sure you want to delete this user?`)
        console.log(`   This action cannot be undone!`)

        // In a real script, you might want to add a confirmation prompt
        // For now, we'll proceed with deletion

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
    // Get email from command line arguments
    const email = process.argv[2]

    if (!email) {
        console.error('❌ Usage: bun scripts/delete_user.ts <email>')
        console.error('')
        console.error('Example:')
        console.error('   bun scripts/delete_user.ts user@example.com')
        process.exit(1)
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        console.error(`❌ Invalid email format: ${email}`)
        process.exit(1)
    }

    console.log('🚀 Supabase User Deletion Script')
    console.log('================================')

    const success = await deleteUser(email)

    if (success) {
        console.log('\n🎉 User deletion completed successfully!')
        process.exit(0)
    } else {
        console.log('\n💥 User deletion failed!')
        process.exit(1)
    }
}

// Run the script
main().catch((error) => {
    console.error('💥 Script failed:', error)
    process.exit(1)
}) 