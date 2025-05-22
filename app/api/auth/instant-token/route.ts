import { init } from '@instantdb/admin'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize InstantDB Admin
const db = init({
    appId: process.env.INSTANT_APP_ID!,
    adminToken: process.env.INSTANT_ADMIN_TOKEN!
})

// Initialize Supabase Admin Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
    try {
        const { supabaseToken } = await request.json()

        if (!supabaseToken) {
            return NextResponse.json(
                { error: 'Supabase token is required' },
                { status: 400 }
            )
        }

        // Verify the Supabase token and get user
        const { data: { user }, error } = await supabase.auth.getUser(supabaseToken)

        if (error || !user) {
            return NextResponse.json(
                { error: 'Invalid Supabase token' },
                { status: 401 }
            )
        }

        // Create InstantDB token for this user
        const instantToken = await db.auth.createToken(user.email!)

        return NextResponse.json({
            success: true,
            token: instantToken,
            user: {
                id: user.id,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Error creating InstantDB token:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 