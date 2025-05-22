import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

interface SignupSuccessProps {
    searchParams: { email?: string }
}

export default function SignupSuccessPage({ searchParams }: SignupSuccessProps) {
    const email = searchParams.email

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl text-green-900">Check your email!</CardTitle>
                    <CardDescription className="text-base">
                        We've sent a confirmation link to {email ? <strong>{email}</strong> : 'your email address'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                        <p className="font-semibold mb-2">Next steps:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Check your inbox (and spam folder)</li>
                            <li>Click the confirmation link in the email</li>
                            <li>Return here to sign in</li>
                        </ol>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        <p>Didn't receive an email? Check your spam folder or try signing up again.</p>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Button asChild>
                            <Link href="/login">
                                Back to Sign In
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">
                                Go Home
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 