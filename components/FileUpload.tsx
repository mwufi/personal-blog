'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthSync } from '@/lib/auth-sync'

interface FileUploadProps {
    onFileUpload?: (files: File[]) => void
    maxSize?: number // in bytes
    acceptedTypes?: string[]
}

export function FileUpload({
    onFileUpload,
    maxSize = 10 * 1024 * 1024, // 10MB default
    acceptedTypes = ['.pdf', '.docx', '.txt']
}: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
    const [error, setError] = useState<string | null>(null)

    const { user } = useAuthSync()

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleFiles = useCallback(async (files: FileList | File[]) => {
        if (!user?.id) {
            setError('You must be logged in to upload files')
            return
        }

        const fileArray = Array.from(files)
        setError(null)

        // Validate files
        const validFiles = fileArray.filter(file => {
            const isValidType = acceptedTypes.some(type =>
                file.name.toLowerCase().endsWith(type.toLowerCase())
            )
            const isValidSize = file.size <= maxSize

            if (!isValidType) {
                setError(`File ${file.name} has invalid type. Supported: ${acceptedTypes.join(', ')}`)
                return false
            }
            if (!isValidSize) {
                setError(`File ${file.name} is too large. Max size: ${formatFileSize(maxSize)}`)
                return false
            }
            return true
        })

        if (validFiles.length === 0) return

        setIsUploading(true)

        try {
            // Upload files one by one
            for (const file of validFiles) {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('userId', user.id)

                setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))

                const response = await fetch('/api/documents/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.error || 'Upload failed')
                }

                const result = await response.json()

                setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
                setUploadedFiles(prev => [...prev, file.name])

                // Simulate processing delay for UI feedback
                setTimeout(() => {
                    setUploadProgress(prev => {
                        const newProgress = { ...prev }
                        delete newProgress[file.name]
                        return newProgress
                    })
                }, 2000)
            }

            // Call the callback if provided
            onFileUpload?.(validFiles)

        } catch (error) {
            console.error('Upload failed:', error)
            setError(error instanceof Error ? error.message : 'Upload failed')
        } finally {
            setIsUploading(false)
        }
    }, [acceptedTypes, maxSize, onFileUpload, user?.id])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            handleFiles(files)
        }
    }, [handleFiles])

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            handleFiles(files)
        }
        // Reset input
        e.target.value = ''
    }, [handleFiles])

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                    ? 'border-teal-400 bg-teal-50 dark:border-teal-500 dark:bg-teal-950/20'
                    : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    accept={acceptedTypes.join(',')}
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                />

                <div className="space-y-4">
                    <div className="mx-auto h-12 w-12 text-zinc-400">
                        {isUploading ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                        ) : (
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
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        )}
                    </div>

                    <div>
                        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                            {isUploading ? 'Uploading...' : 'Drop files here or click to browse'}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Supports {acceptedTypes.join(', ')} up to {formatFileSize(maxSize)}
                        </p>
                    </div>

                    {!isUploading && (
                        <Button variant="outline" size="sm" className="pointer-events-none">
                            Choose Files
                        </Button>
                    )}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Uploading...
                    </h4>
                    {Object.entries(uploadProgress).map(([fileName, progress]) => (
                        <div key={fileName} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-600 dark:text-zinc-400">{fileName}</span>
                                <span className="text-zinc-500 dark:text-zinc-500">{progress}%</span>
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2 dark:bg-zinc-700">
                                <div
                                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Recently Uploaded */}
            {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Recently Uploaded
                    </h4>
                    <div className="space-y-1">
                        {uploadedFiles.slice(-3).map((fileName, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400"
                            >
                                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{fileName}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 