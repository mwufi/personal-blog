'use client'

import { useState } from 'react'

export function SubscribeForm() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        // Add your newsletter subscription logic here
        // For now, just simulate success
        setTimeout(() => {
            setStatus('success')
            setEmail('')
        }, 1000)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
        >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-6 w-6 flex-none"
                >
                    <path
                        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                    />
                    <path
                        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
                        className="stroke-zinc-400 dark:stroke-zinc-500"
                    />
                </svg>
                <span className="ml-3">Stay up to date</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at any time.
            </p>

            {status === 'success' ? (
                <div className="mt-6 text-sm text-green-600 dark:text-green-400">
                    Thanks for subscribing! Check your email for confirmation.
                </div>
            ) : (
                <div className="mt-6 flex items-center">
                    <span className="flex min-w-0 flex-auto p-px">
                        <input
                            type="email"
                            placeholder="Email address"
                            aria-label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'loading'}
                            className="w-full appearance-none rounded-[calc(theme(borderRadius.md)-1px)] bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
                        />
                    </span>
                    <button
                        type="submit"
                        disabled={status === 'loading' || !email}
                        className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Joining...' : 'Join'}
                    </button>
                </div>
            )}
        </form>
    )
} 