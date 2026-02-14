'use client'

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react'

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

// 登录有效期：1小时（毫秒）
const SESSION_DURATION = 1 * 60 * 60 * 1000

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const expirationTimerRef = useRef<NodeJS.Timeout | null>(null)

    // 清除过期定时器
    const clearExpirationTimer = () => {
        if (expirationTimerRef.current) {
            clearTimeout(expirationTimerRef.current)
            expirationTimerRef.current = null
        }
    }

    // 设置过期定时器
    const setExpirationTimer = (remainingMs: number) => {
        clearExpirationTimer()
        expirationTimerRef.current = setTimeout(() => {
            logout()
        }, remainingMs)
    }

    useEffect(() => {
        // Check localStorage for existing authentication
        const hasAccess = localStorage.getItem('utopia_access_v2')
        const expiresAt = localStorage.getItem('utopia_access_expires')
        const storedUserId = localStorage.getItem('utopia_user_id')

        if (hasAccess && expiresAt) {
            const remaining = Number(expiresAt) - Date.now()
            if (remaining > 0) {
                // 未过期，恢复登录状态
                setIsAuthenticated(true)
                setCurrentUserId(storedUserId)
                document.body.classList.add('auth-ready')
                // 设置剩余时间后自动登出
                setExpirationTimer(remaining)
            } else {
                // 已过期，清除登录信息
                localStorage.removeItem('utopia_access_v2')
                localStorage.removeItem('utopia_access_expires')
                localStorage.removeItem('utopia_user_id')
            }
        } else if (hasAccess) {
            // 兼容旧版无过期时间的登录，清除重新登录
            localStorage.removeItem('utopia_access_v2')
            localStorage.removeItem('utopia_user_id')
        }
        setIsLoading(false)

        return () => clearExpirationTimer()
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
        const expiresAt = Date.now() + SESSION_DURATION
        localStorage.setItem('utopia_access_v2', 'true')
        localStorage.setItem('utopia_access_expires', expiresAt.toString())
        localStorage.setItem('utopia_user_id', userId)
        setIsAuthenticated(true)
        setCurrentUserId(userId)
        // 设置1小时后自动登出
        setExpirationTimer(SESSION_DURATION)
    }

    const logout = () => {
        clearExpirationTimer()
        // Clear authentication from localStorage
        localStorage.removeItem('utopia_access_v2')
        localStorage.removeItem('utopia_access_expires')
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
