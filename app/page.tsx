import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from '@/lib/supabase/server'

export default async function Home() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to{" "}
                    <span className="text-blue-600">Your App!</span>
                </h1>

                <p className="mt-3 text-2xl">
                    {user ? `Hello, ${user.email}! Ready to get started?` : 'Get started by signing in or creating an account'}
                </p>

                <div className="flex items-center justify-center gap-4 max-w-4xl mt-6 sm:w-full">
                    {user ? (
                        <Button asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    ) : (
                        <>
                            <Button asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/login">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
} 