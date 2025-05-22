'use client'

import { useEffect, useState } from 'react'
import { useAuth as useSupabaseAuth } from '@/components/auth/auth-provider'
import { useAuth as useInstantAuth } from '@/lib/instant'
import { db } from '@/lib/instant'
import { createClient } from '@/lib/supabase/client'

/**
 * Hook that syncs Supabase auth with InstantDB using custom auth tokens
 * This allows us to use Supabase auth while getting InstantDB's real-time features
 */
export function useAuthSync() {
    const { user: supabaseUser, loading: supabaseLoading } = useSupabaseAuth()
    const { user: instantUser, isLoading: instantLoading } = useInstantAuth()
    const [syncing, setSyncing] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        const syncAuth = async () => {
            // If no Supabase user, sign out of InstantDB
            if (!supabaseUser && !supabaseLoading) {
                if (instantUser) {
                    db.auth.signOut()
                }
                return
            }

            // If we have Supabase user but no InstantDB user, sync them
            if (supabaseUser && !instantUser && !instantLoading && !syncing) {
                setSyncing(true)

                try {
                    // Get Supabase session token
                    const { data: { session } } = await supabase.auth.getSession()

                    if (session?.access_token) {
                        // Create InstantDB token using our API
                        const response = await fetch('/api/auth/instant-token', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                supabaseToken: session.access_token
                            })
                        })

                        if (response.ok) {
                            const { token } = await response.json()
                            // Sign into InstantDB with the token
                            await db.auth.signInWithToken(token)
                        } else {
                            console.error('Failed to create InstantDB token')
                        }
                    }
                } catch (error) {
                    console.error('Failed to sync auth:', error)
                } finally {
                    setSyncing(false)
                }
            }
        }

        syncAuth()
    }, [supabaseUser, supabaseLoading, instantUser, instantLoading, syncing, supabase])

    // Return the combined state
    return {
        user: supabaseUser, // Keep using Supabase user for UI
        loading: supabaseLoading || instantLoading || syncing,
        instantUser // Available if needed
    }
} 