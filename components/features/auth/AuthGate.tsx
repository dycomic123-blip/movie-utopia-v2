'use client'

import { ReactNode } from 'react'
import { useAuth } from './AuthProvider'

interface AuthGateProps {
    children: ReactNode
}

/**
 * AuthGate component that completely hides the main content until authentication is confirmed.
 * This prevents any flash of content before the login modal appears.
 */
export function AuthGate({ children }: AuthGateProps) {
    const { isAuthenticated, isLoading } = useAuth()

    // While loading or not authenticated, render nothing (content is completely hidden)
    // The login modal will be shown separately
    if (isLoading || !isAuthenticated) {
        return null
    }

    return <>{children}</>
}
