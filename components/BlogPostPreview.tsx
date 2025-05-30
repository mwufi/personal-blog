import Link from 'next/link'

interface BlogPostPreviewProps {
    title: string
    date: string
    description: string
    slug: string
    variant?: 'blog' | 'home'
}

export function BlogPostPreview({ title, date, description, slug, variant = 'blog' }: BlogPostPreviewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    if (variant === 'home') {
        return (
            <article className="group relative flex flex-col items-start">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
                    <Link href={`/blog/${slug}`}>
                        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span className="relative z-10 text-zinc-700">{title}</span>
                    </Link>
                </h2>

                <time
                    className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                    dateTime={date}
                >
                    <span
                        className="absolute inset-y-0 left-0 flex items-center"
                        aria-hidden="true"
                    >
                        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    {formatDate(date)}
                </time>

                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>

                <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                >
                    Read article
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="ml-1 h-4 w-4 stroke-current"
                    >
                        <path
                            d="M6.75 5.75 9.25 8l-2.5 2.25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </article>
        )
    }

    // Default blog page layout
    return (
        <article className="md:grid md:grid-cols-4 md:items-baseline">
            <div className="md:col-span-3 group relative flex flex-col items-start">
                <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>
                    <Link href={`/blog/${slug}`}>
                        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span className="relative z-10">{title}</span>
                    </Link>
                </h2>

                <time
                    className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
                    dateTime={date}
                >
                    <span
                        className="absolute inset-y-0 left-0 flex items-center"
                        aria-hidden="true"
                    >
                        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                    </span>
                    {formatDate(date)}
                </time>

                <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>

                <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                >
                    Read article
                    <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="ml-1 h-4 w-4 stroke-current"
                    >
                        <path
                            d="M6.75 5.75 9.25 8l-2.5 2.25"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <time
                className="mt-1 max-md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
                dateTime={date}
            >
                {formatDate(date)}
            </time>
        </article>
    )
} 