import Link from 'next/link'
import { login } from './actions'


export default async function LoginPage({ searchParams }) {
    const { message } = await searchParams

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
                            Sign up here
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
                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="off"
                                required
                                className="relative block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground focus:z-10 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                className="relative block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground focus:z-10 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={login}
                            className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 