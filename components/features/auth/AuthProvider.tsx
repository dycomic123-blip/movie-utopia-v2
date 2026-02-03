'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check localStorage for existing authentication
        const hasAccess = localStorage.getItem('utopia_access_v2')
        if (hasAccess) {
            setIsAuthenticated(true)
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

    const login = () => {
        localStorage.setItem('utopia_access_v2', 'true')
        setIsAuthenticated(true)
    }

    const logout = () => {
        // Clear authentication from localStorage
        localStorage.removeItem('utopia_access_v2')
        // Remove the auth-ready class to show the overlay
        document.body.classList.remove('auth-ready')
        // Set authenticated to false - this will show the login modal
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
