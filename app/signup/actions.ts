'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // Extract form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string

    // Validate inputs
    if (!email || !password || !confirmPassword) {
        redirect('/signup?message=' + encodeURIComponent('All fields are required'))
    }

    // Check password confirmation
    if (password !== confirmPassword) {
        redirect('/signup?message=' + encodeURIComponent('Passwords do not match'))
    }

    // Check password strength
    if (password.length < 6) {
        redirect('/signup?message=' + encodeURIComponent('Password must be at least 6 characters long'))
    }

    const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error.message)
        redirect('/signup?message=' + encodeURIComponent(error.message))
    }

    // If email confirmation is enabled, redirect to success page
    if (result.user && !result.session) {
        redirect('/signup-success?email=' + encodeURIComponent(email))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
} 