import Link from 'next/link'

interface Document {
    id: string
    name: string
    type: string
    size: number
    uploadedAt: Date
    status: 'uploading' | 'processing' | 'ready' | 'error'
    chunkCount?: number
}

interface DocumentGridProps {
    documents: Document[]
}

export function DocumentGrid({ documents }: DocumentGridProps) {
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const getFileIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return (
                    <svg className="h-8 w-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                )
            case 'docx':
                return (
                    <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                )
            default:
                return (
                    <svg className="h-8 w-8 text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                )
        }
    }

    const getStatusBadge = (status: Document['status']) => {
        switch (status) {
            case 'ready':
                return (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-300">
                        Ready
                    </span>
                )
            case 'processing':
                return (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                        Processing
                    </span>
                )
            case 'uploading':
                return (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        Uploading
                    </span>
                )
            case 'error':
                return (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/20 dark:text-red-300">
                        Error
                    </span>
                )
        }
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
                <article
                    key={document.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
                >
                    <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50"></div>

                    <div className="relative z-10 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                {getFileIcon(document.type)}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                        {document.name}
                                    </h3>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {formatFileSize(document.size)} • {formatDate(document.uploadedAt)}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(document.status)}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {document.chunkCount ? `${document.chunkCount} chunks` : 'No chunks yet'}
                            </div>

                            <div className="flex space-x-2">
                                {document.status === 'ready' && (
                                    <Link
                                        href={`/app/chat?doc=${document.id}`}
                                        className="text-xs font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
                                    >
                                        Chat
                                    </Link>
                                )}
                                <button className="text-xs font-medium text-zinc-600 hover:text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-300">
                                    View
                                </button>
                            </div>
                        </div>

                        {document.status === 'ready' && (
                            <div
                                aria-hidden="true"
                                className="mt-4 flex items-center text-xs font-medium text-teal-500"
                            >
                                Ready to chat
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden="true"
                                    className="ml-1 h-3 w-3 stroke-current"
                                >
                                    <path
                                        d="M6.75 5.75 9.25 8l-2.5 2.25"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    )
} 