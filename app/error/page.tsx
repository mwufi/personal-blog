import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ErrorPage({ searchParams }) {
    const { message: errorMessage } = await searchParams

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
                    <CardDescription>
                        {errorMessage ? errorMessage : 'There was an issue with your authentication request.'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center text-sm text-muted-foreground">
                        <p>This could be due to:</p>
                        <ul className="mt-2 space-y-1 text-left">
                            <li>• Invalid login credentials</li>
                            <li>• Expired or invalid token</li>
                            <li>• Network connectivity issues</li>
                            <li>• Temporary server problems</li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Button asChild>
                            <Link href="/login">
                                Try Again
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