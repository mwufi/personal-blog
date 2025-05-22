'use client'

import Link from 'next/link'
import { useAuth } from './auth-provider'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function UserNav() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (loading) {
        return (
            <div className="flex items-center space-x-4">
                <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
            </div>
        )
    }

    if (user) {
        return (
            <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                    {user.email}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                >
                    Sign out
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/login">Sign up</Link>
            </Button>
        </div>
    )
} 