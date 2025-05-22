import { Metadata } from 'next'
import { AuthWrapper } from '@/components/auth/auth-wrapper'
import { AppHeader } from '@/components/AppHeader'

export const metadata: Metadata = {
    title: 'Zen Tomorrow | Document Chat App',
    description: 'AI-powered document management and chat system',
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthWrapper>
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <AppHeader />
                <main className="pt-16">
                    {children}
                </main>
            </div>
        </AuthWrapper>
    )
} 