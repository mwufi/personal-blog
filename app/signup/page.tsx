import Link from 'next/link'
import { SignupForm } from './client-form'

interface SignupPageProps {
    searchParams: Promise<{ message?: string }>
}

export default async function SignupPage(props: SignupPageProps) {
    const searchParams = await props.searchParams;
    const message = searchParams.message

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                            Sign in here
                        </Link>
                    </p>
                    {message && (
                        <div className={`mt-4 p-4 text-sm text-center rounded-md border ${message.includes('⚠️')
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                            }`}>
                            <div className="font-medium">{message}</div>
                        </div>
                    )}
                </div>
                <SignupForm />
            </div>
        </div>
    )
} 