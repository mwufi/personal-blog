import { init } from '@instantdb/react'
import schema, { type AppSchema } from '../instant.schema'

// Initialize InstantDB
const instantDb = init<AppSchema>({
    appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID!
})

// Export typed hooks
export const {
    useQuery,
    transact,
    tx,
    useAuth
} = instantDb

// Export the db instance for auth operations
export const db = instantDb

// Export types
export type { Document, Collection, Note, ChatSession, ChatMessage } from '../instant.schema'