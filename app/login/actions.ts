'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error('Login error:', error.message)
        // Check if it's an email not confirmed error
        if (error.message.includes('email not confirmed') || error.message.includes('Email not confirmed')) {
            redirect('/login?message=' + encodeURIComponent('⚠️ Please check your email and click the confirmation link before signing in. Check your spam folder if you don\'t see it!'))
        }
        redirect('/error?message=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: result, error } = await supabase.auth.signUp(data)

    if (error) {
        console.error('Signup error:', error.message)
        redirect('/error?message=' + encodeURIComponent(error.message))
    }

    // If email confirmation is enabled, redirect to success page
    if (result.user && !result.session) {
        redirect('/signup-success?email=' + encodeURIComponent(data.email))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
} 