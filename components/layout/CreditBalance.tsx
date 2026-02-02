'use client'

import { Coins } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function CreditBalance() {
  const credits = useAppStore((state) => state.credits)

  return (
    <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg">
      <Coins className="w-4 h-4 text-accent" aria-hidden="true" />
      <span className="text-sm font-medium">{credits} Credits</span>
    </div>
  )
}
