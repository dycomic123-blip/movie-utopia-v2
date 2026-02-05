'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthProvider'
import { UserProfile } from '@/lib/types/user'

interface UserProfileContextType {
  profile: UserProfile | null
  isLoading: boolean
  refreshProfile: () => Promise<void>
}

const UserProfileContext = createContext<UserProfileContextType>({
  profile: null,
  isLoading: true,
  refreshProfile: async () => {}
})

export function useUserProfile() {
  return useContext(UserProfileContext)
}

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { currentUserId } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = async () => {
    if (!currentUserId) {
      setProfile(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/users/${currentUserId}`)
      if (!response.ok) throw new Error('Failed to load user profile')
      
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Failed to load user profile:', error)
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [currentUserId])

  const refreshProfile = async () => {
    await loadProfile()
  }

  return (
    <UserProfileContext.Provider value={{ profile, isLoading, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}
