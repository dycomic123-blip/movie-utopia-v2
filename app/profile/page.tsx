'use client'

import { useMemo } from 'react'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { ProfilePageClient } from '@/components/features/profile/ProfilePageClient'

export default function ProfilePage() {
  const { currentUserId } = useAuth()
  const numericUserId = useMemo(() => Number(currentUserId), [currentUserId])

  if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
    return (
      <div className="min-h-screen pt-12 pb-16">
        <div className="container mx-auto max-w-7xl px-3">
          <div className="glass-premium rounded-3xl border border-white/10 p-8">
            <p className="text-sm text-neutral-400">请先登录</p>
          </div>
        </div>
      </div>
    )
  }

  return <ProfilePageClient userId={numericUserId} />
}
