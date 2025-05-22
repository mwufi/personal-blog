'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface DocumentViewerProps {
    document: {
        id: string
        name: string
        type: string
        supabaseUrl: string
        storagePath: string
    }
    onClose: () => void
}

export function DocumentViewer({ document: file, onClose }: DocumentViewerProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [content, setContent] = useState<string | null>(null)

    const supabase = createClient()

    useEffect(() => {
        const loadDocument = async () => {
            setIsLoading(true)
            setError(null)

            try {
                if (file.type.toLowerCase() === 'pdf') {
                    // For PDFs, we'll show them in an iframe
                    setContent(file.supabaseUrl)
                } else if (file.type.toLowerCase() === 'txt') {
                    // For text files, fetch and display content
                    const response = await fetch(file.supabaseUrl)
                    if (!response.ok) throw new Error('Failed to fetch document')
                    const text = await response.text()
                    setContent(text)
                } else {
                    // For other file types, show download link
                    setContent(null)
                }
            } catch (err) {
                console.error('Error loading document:', err)
                setError(err instanceof Error ? err.message : 'Failed to load document')
            } finally {
                setIsLoading(false)
            }
        }

        loadDocument()
    }, [file])

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = file.supabaseUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.click()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4">
            <div className="w-full max-w-7xl h-[95vh] bg-white dark:bg-zinc-800 rounded-lg shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {file.name}
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {file.type.toUpperCase()} Document
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleDownload}
                            className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                        >
                            Open in New Tab
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    {isLoading && (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                            <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading document...</span>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-600 dark:text-red-400">
                                    Error loading document: {error}
                                </p>
                                <button
                                    onClick={handleDownload}
                                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                >
                                    Open in New Tab
                                </button>
                            </div>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <>
                            {file.type.toLowerCase() === 'pdf' && content && (
                                <iframe
                                    src={content}
                                    className="w-full h-full min-h-[600px]"
                                    title={file.name}
                                    style={{ height: 'calc(95vh - 100px)' }}
                                />
                            )}

                            {file.type.toLowerCase() === 'txt' && content && (
                                <div className="p-6">
                                    <pre className="whitespace-pre-wrap text-sm text-zinc-900 dark:text-zinc-100 font-mono">
                                        {content}
                                    </pre>
                                </div>
                            )}

                            {!['pdf', 'txt'].includes(file.type.toLowerCase()) && (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-zinc-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                                            Preview not available
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                            This file type can't be previewed in the browser.
                                        </p>
                                        <button
                                            onClick={handleDownload}
                                            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                                        >
                                            Open in New Tab
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
} 