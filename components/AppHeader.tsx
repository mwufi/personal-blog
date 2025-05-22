'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/auth/auth-provider'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export function AppHeader() {
    const { user, loading } = useAuth()
    const [isDark, setIsDark] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDark(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)

        if (newTheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setIsDropdownOpen(false)
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo / Home Link */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Zen Tomorrow"
                                width={32}
                                height={32}
                                className="rounded-full ring-2 ring-white dark:ring-zinc-800"
                            />
                            <span className="font-semibold text-lg">Zen Tomorrow</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/app"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                            Documents
                        </Link>
                        <Link
                            href="/app/chat"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                            Chat
                        </Link>
                        <Link
                            href="/app/collections"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                        >
                            Collections
                        </Link>
                    </nav>

                    {/* Right side - Auth & Theme */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            type="button"
                            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                            className="rounded-full bg-zinc-100 p-2 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 transition-colors"
                            onClick={toggleTheme}
                        >
                            {/* Sun icon - shown in dark mode */}
                            <svg
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className={`h-5 w-5 ${isDark ? 'block' : 'hidden'}`}
                            >
                                <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
                                <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none" />
                            </svg>

                            {/* Moon icon - shown in light mode */}
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`h-5 w-5 ${isDark ? 'hidden' : 'block'}`}
                            >
                                <path
                                    d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Authentication */}
                        {loading ? (
                            <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
                        ) : user ? (
                            /* User Dropdown */
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 rounded-full bg-zinc-100 p-1 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <Image
                                        src={`https://avatar.vercel.sh/${user.email}`}
                                        alt={user.email || 'User'}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                                        <div className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                                            {user.email}
                                        </div>
                                        <Link
                                            href="/app/profile"
                                            className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <Link
                                            href="/app/settings"
                                            className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Settings
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Sign In Button */
                            <Button asChild variant="default" size="sm">
                                <Link href="/login">Sign In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
} 