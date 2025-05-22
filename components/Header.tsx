'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="pointer-events-none relative z-50 flex flex-none flex-col">
            {/* Avatar section */}
            <div className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"></div>
            <div className="sm:px-8 top-0 order-last -mb-3 pt-3 sticky">
                <div className="mx-auto w-full max-w-7xl lg:px-8">
                    <div className="relative px-4 sm:px-8 lg:px-12">
                        <div className="mx-auto max-w-2xl lg:max-w-5xl">
                            <div className="top-3 w-full absolute">
                                <div className="relative">
                                    <div
                                        className="absolute top-3 left-0 origin-left transition-opacity h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
                                        style={{ opacity: 'var(--avatar-border-opacity, 0)', transform: 'var(--avatar-border-transform)' }}
                                    ></div>
                                    <Link
                                        href="/"
                                        aria-label="Home"
                                        className="block h-16 w-16 origin-left pointer-events-auto"
                                        style={{ transform: 'var(--avatar-image-transform)' }}
                                    >
                                        <Image
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="Avatar"
                                            width={64}
                                            height={64}
                                            className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
                                            priority
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="top-0 z-10 h-16 pt-6 sticky">
                <div className="sm:px-8 top-6 w-full absolute">
                    <div className="mx-auto w-full max-w-7xl lg:px-8">
                        <div className="relative px-4 sm:px-8 lg:px-12">
                            <div className="mx-auto max-w-2xl lg:max-w-5xl">
                                <div className="relative flex gap-4">
                                    <div className="flex flex-1"></div>
                                    <div className="flex flex-1 justify-end md:justify-center">
                                        {/* Mobile menu button */}
                                        <div className="pointer-events-auto md:hidden">
                                            <button
                                                className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
                                                type="button"
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                            >
                                                Menu
                                                <svg
                                                    viewBox="0 0 8 6"
                                                    aria-hidden="true"
                                                    className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
                                                >
                                                    <path
                                                        d="M1.75 1.75 4 4.25l2.25-2.5"
                                                        fill="none"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Desktop navigation */}
                                        <nav className="pointer-events-auto hidden md:block">
                                            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                                                <li>
                                                    <Link
                                                        href="/about"
                                                        className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                    >
                                                        About
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/blog"
                                                        className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                    >
                                                        Articles
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/projects"
                                                        className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                    >
                                                        Projects
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/speaking"
                                                        className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                    >
                                                        Speaking
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href="/uses"
                                                        className="relative block px-3 py-2 transition hover:text-teal-500 dark:hover:text-teal-400"
                                                    >
                                                        Uses
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    {/* Theme toggle */}
                                    <div className="flex justify-end md:flex-1">
                                        <div className="pointer-events-auto">
                                            <ThemeToggle />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function ThemeToggle() {
    return (
        <button
            type="button"
            aria-label="Switch to dark theme"
            className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        >
            {/* Sun icon */}
            <svg
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden"
            >
                <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
                <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none" />
            </svg>

            {/* Moon icon */}
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block"
            >
                <path
                    d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
} 