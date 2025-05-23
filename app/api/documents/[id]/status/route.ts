import { init, tx } from '@instantdb/admin'
import { NextRequest, NextResponse } from 'next/server'

// Initialize InstantDB Admin
const db = init({
    appId: process.env.INSTANT_APP_ID!,
    adminToken: process.env.INSTANT_ADMIN_TOKEN!
})

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { status, chunkCount } = await request.json()
        const { id: documentId } = await context.params

        if (!status || !['uploading', 'processing', 'ready', 'error'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            )
        }

        // Update document status
        const updateData: any = { status }
        if (chunkCount !== undefined) {
            updateData.chunkCount = chunkCount
        }

        await db.transact([
            tx.documents[documentId].update(updateData)
        ])

        return NextResponse.json({
            success: true,
            documentId,
            status,
            ...(chunkCount !== undefined && { chunkCount })
        })

    } catch (error) {
        console.error('Error updating document status:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 