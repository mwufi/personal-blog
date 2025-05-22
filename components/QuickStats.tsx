interface QuickStatsProps {
    stats: {
        totalDocuments: number
        totalChats: number
        storageUsed: string
        lastActive: Date
    }
}

export function QuickStats({ stats }: QuickStatsProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const statItems = [
        {
            label: 'Documents',
            value: stats.totalDocuments.toString(),
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'Chat Sessions',
            value: stats.totalChats.toString(),
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            label: 'Storage Used',
            value: stats.storageUsed,
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
        {
            label: 'Last Active',
            value: formatDate(stats.lastActive),
            icon: (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statItems.map((item, index) => (
                <div
                    key={index}
                    className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
                >
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-500 text-white">
                                {item.icon}
                            </div>
                        </div>
                        <div className="ml-4 w-0 flex-1">
                            <dl>
                                <dt className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    {item.label}
                                </dt>
                                <dd className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {item.value}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
} 