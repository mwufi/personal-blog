import { FileUpload } from '@/components/FileUpload'
import { DocumentGrid } from '@/components/DocumentGrid'
import { QuickStats } from '@/components/QuickStats'

// Mock data - this will be replaced with real data later
const mockDocuments = [
    {
        id: '1',
        name: 'Product Requirements Document.pdf',
        type: 'pdf',
        size: 2456789,
        uploadedAt: new Date('2024-01-15'),
        status: 'ready' as const,
        chunkCount: 45
    },
    {
        id: '2',
        name: 'Meeting Notes Q1 2024.docx',
        type: 'docx',
        size: 876543,
        uploadedAt: new Date('2024-01-10'),
        status: 'ready' as const,
        chunkCount: 23
    },
    {
        id: '3',
        name: 'Research Paper Draft.pdf',
        type: 'pdf',
        size: 3234567,
        uploadedAt: new Date('2024-01-08'),
        status: 'processing' as const,
        chunkCount: 0
    }
]

const mockStats = {
    totalDocuments: 12,
    totalChats: 8,
    storageUsed: '248 MB',
    lastActive: new Date('2024-01-15')
}

export default function AppPage() {
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
                <QuickStats stats={mockStats} />
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
                    <FileUpload />
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

                <DocumentGrid documents={mockDocuments} />
            </div>

            {/* Empty State (when no documents) */}
            {mockDocuments.length === 0 && (
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