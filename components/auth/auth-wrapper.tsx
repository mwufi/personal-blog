import { createClient } from '@/lib/supabase/server'
import { AuthProvider } from './auth-provider'

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
    const supabase = await createClient()

    try {
        const { data: { user } } = await supabase.auth.getUser()

        return (
            <AuthProvider serverUser={user}>
                {children}
            </AuthProvider>
        )
    } catch (error) {
        // If there's an error getting the user, proceed with null user
        return (
            <AuthProvider serverUser={null}>
                {children}
            </AuthProvider>
        )
    }
} 