import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { logout } from './actions'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {data.user.email}
                        </p>
                    </div>
                    <form action={logout}>
                        <Button variant="outline" type="submit">
                            Sign out
                        </Button>
                    </form>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{data.user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">User ID</p>
                                <p className="text-sm text-muted-foreground">{data.user.id}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Created</p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(data.user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Last Sign In</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.user.last_sign_in_at ?
                                        new Date(data.user.last_sign_in_at).toLocaleString() :
                                        'Never'
                                    }
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Manage your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                Update Profile
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                Account Settings
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Getting Started</CardTitle>
                            <CardDescription>Next steps for your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-sm">
                                <p className="font-medium">✓ Account created</p>
                                <p className="text-muted-foreground">You've successfully created your account</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">○ Complete profile</p>
                                <p className="text-muted-foreground">Add your personal information</p>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium">○ Upload documents</p>
                                <p className="text-muted-foreground">Start building your knowledge base</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 