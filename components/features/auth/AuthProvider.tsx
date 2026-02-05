'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    currentUserId: string | null
    login: (userId: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    currentUserId: null,
    login: () => { },
    logout: () => { },
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
        // Check localStorage for existing authentication
        const hasAccess = localStorage.getItem('utopia_access_v2')
        const storedUserId = localStorage.getItem('utopia_user_id')
        if (hasAccess) {
            setIsAuthenticated(true)
            setCurrentUserId(storedUserId)
            // If already authenticated, show content immediately
            document.body.classList.add('auth-ready')
        }
        setIsLoading(false)
    }, [])

    // Update body class when authentication state changes
    useEffect(() => {
        if (isAuthenticated) {
            // Small delay to ensure smooth transition after login animation
            setTimeout(() => {
                document.body.classList.add('auth-ready')
            }, 100)
        }
    }, [isAuthenticated])

    const login = (userId: string) => {
        localStorage.setItem('utopia_access_v2', 'true')
        localStorage.setItem('utopia_user_id', userId)
        setIsAuthenticated(true)
        setCurrentUserId(userId)
    }

    const logout = () => {
        // Clear authentication from localStorage
        localStorage.removeItem('utopia_access_v2')
        localStorage.removeItem('utopia_user_id')
        // Remove the auth-ready class to show the overlay
        document.body.classList.remove('auth-ready')
        // Set authenticated to false - this will show the login modal
        setIsAuthenticated(false)
        setCurrentUserId(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, currentUserId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
