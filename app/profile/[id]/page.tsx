'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { ProfilePageClient } from '@/components/features/profile/ProfilePageClient'

export default function ProfileUserPage() {
  const params = useParams()
  const userId = useMemo(() => {
    const raw = params?.id
    const value = Array.isArray(raw) ? raw[0] : raw
    return value ? Number(value) : NaN
  }, [params])

  return <ProfilePageClient userId={Number.isFinite(userId) ? userId : null} />
}
