import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { id, init, tx } from '@instantdb/admin'
import { NextRequest, NextResponse } from 'next/server'

// Initialize InstantDB Admin
const db = init({
    appId: process.env.INSTANT_APP_ID!,
    adminToken: process.env.INSTANT_ADMIN_TOKEN!
})

// Initialize Supabase Admin Client
const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const userId = formData.get('userId') as string

        if (!file || !userId) {
            return NextResponse.json(
                { error: 'File and userId are required' },
                { status: 400 }
            )
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'File type not supported' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (uploadError) {
            console.error('Supabase upload error:', uploadError)
            return NextResponse.json(
                { error: 'Failed to upload file' },
                { status: 500 }
            )
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(uploadData.path)

        // Create document record in InstantDB
        const documentId = id()
        const now = Date.now()

        await db.transact([
            tx.documents[documentId].update({
                name: file.name,
                type: fileExt || 'unknown',
                size: file.size,
                userId: userId,
                supabaseUrl: publicUrl,
                storagePath: uploadData.path,
                status: 'ready', // For now, mark as ready immediately for testing
                uploadedAt: now,
                chunkCount: Math.floor(file.size / 1000), // Mock chunk count based on file size
                metadata: {},
                tags: []
            })
        ])

        // TODO: Trigger document processing here
        // This is where we'd start the text extraction and chunking process
        // For now, we mark documents as ready immediately for testing

        return NextResponse.json({
            success: true,
            document: {
                id: documentId,
                name: file.name,
                type: fileExt,
                size: file.size,
                status: 'ready',
                uploadedAt: now,
                url: publicUrl,
                chunkCount: Math.floor(file.size / 1000)
            }
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 