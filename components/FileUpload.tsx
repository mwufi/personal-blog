'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'

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

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const handleFiles = useCallback(async (files: FileList | File[]) => {
        const fileArray = Array.from(files)

        // Validate files
        const validFiles = fileArray.filter(file => {
            const isValidType = acceptedTypes.some(type =>
                file.name.toLowerCase().endsWith(type.toLowerCase())
            )
            const isValidSize = file.size <= maxSize

            if (!isValidType) {
                console.warn(`File ${file.name} has invalid type`)
                return false
            }
            if (!isValidSize) {
                console.warn(`File ${file.name} is too large`)
                return false
            }
            return true
        })

        if (validFiles.length === 0) return

        setIsUploading(true)

        // Simulate upload process
        try {
            // Mock upload delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            const newFileNames = validFiles.map(file => file.name)
            setUploadedFiles(prev => [...prev, ...newFileNames])

            // Call the callback if provided
            onFileUpload?.(validFiles)

        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setIsUploading(false)
        }
    }, [acceptedTypes, maxSize, onFileUpload])

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