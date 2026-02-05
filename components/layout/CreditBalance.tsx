'use client'

import { useEffect } from 'react'
import { Coins } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useUserProfile } from '@/components/features/auth/UserProfileProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function CreditBalance() {
  const { t } = useLanguage()
  const { profile } = useUserProfile()
  const credits = useAppStore((state) => state.credits)
  const setCredits = useAppStore((state) => state.setCredits)

  useEffect(() => {
    if (!profile) {
      setCredits(0)
      return
    }

    const balance = Number(profile.walletBalance ?? 0)
    setCredits(Number.isFinite(balance) ? balance : 0)
  }, [profile, setCredits])

  return (
    <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg">
      <Coins className="w-4 h-4 text-accent" aria-hidden="true" />
      <span className="text-sm font-medium">{credits} {t('credits')}</span>
    </div>
  )
}
