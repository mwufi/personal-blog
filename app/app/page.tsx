'use client'

import { FileUpload } from '@/components/FileUpload'
import { DocumentGrid } from '@/components/DocumentGrid'
import { QuickStats } from '@/components/QuickStats'
import { useQuery, useAuth } from '@/lib/instant'
import { useAuthSync } from '@/lib/auth-sync'

function AppContent() {
    const { user: supabaseUser, loading: authLoading } = useAuthSync()
    const { user: instantUser } = useAuth()

    // Query user's documents using InstantDB user
    const { data, isLoading, error } = useQuery({
        documents: {
            $: {
                where: instantUser?.email ? { userId: supabaseUser?.id || 'none' } : { userId: 'none' },
                order: { uploadedAt: 'desc' }
            }
        }
    })

    const documents = data?.documents || []

    // Calculate stats from real data
    const stats = {
        totalDocuments: documents.length,
        totalChats: 0, // TODO: Calculate from chat sessions
        storageUsed: documents.reduce((acc, doc) => acc + (doc.size || 0), 0),
        lastActive: documents.length > 0 ? new Date(Math.max(...documents.map(d => d.uploadedAt || 0))) : new Date()
    }

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
    }

    const statsFormatted = {
        ...stats,
        storageUsed: formatBytes(stats.storageUsed)
    }

    // Transform documents to match the expected interface
    const transformedDocuments = documents.map(doc => ({
        id: doc.id,
        name: doc.name || 'Untitled',
        type: doc.type || 'unknown',
        size: doc.size || 0,
        uploadedAt: new Date(doc.uploadedAt || Date.now()),
        status: doc.status as 'uploading' | 'processing' | 'ready' | 'error',
        chunkCount: doc.chunkCount || 0
    }))

    if (!supabaseUser) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Please log in to access your documents
                    </h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        You need to be authenticated to upload and manage documents.
                    </p>
                </div>
            </div>
        )
    }

    if (authLoading || isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                        {authLoading ? 'Loading...' : 'Loading your documents...'}
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400">Error loading documents: {error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Your Documents
                </h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Upload, organize, and chat with your documents using AI
                </p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
                <QuickStats stats={statsFormatted} />
            </div>

            {/* File Upload Section */}
            <div className="mb-8">
                <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Upload Documents
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Drag and drop files or click to browse. Supports PDF, DOCX, and TXT files.
                        </p>
                    </div>
                    <FileUpload onFileUpload={() => {
                        // Files will be automatically refetched via InstantDB reactivity
                    }} />
                </div>
            </div>

            {/* Documents Grid */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Recent Documents
                    </h2>
                    <div className="flex items-center space-x-2">
                        {/* Search and filter controls will go here */}
                        <button className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700">
                            Filter
                        </button>
                        <button className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700">
                            Sort
                        </button>
                    </div>
                </div>

                <DocumentGrid documents={transformedDocuments} />
            </div>

            {/* Empty State (when no documents) */}
            {transformedDocuments.length === 0 && (
                <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 text-zinc-400">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-12 w-12"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                        No documents yet
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Get started by uploading your first document above.
                    </p>
                </div>
            )}
        </div>
    )
}

export default function AppPage() {
    return <AppContent />
} 