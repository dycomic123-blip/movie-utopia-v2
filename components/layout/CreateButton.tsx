'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface CreateButtonProps {
  className?: string
  onClick?: () => void
}

export function CreateButton({ className, onClick }: CreateButtonProps) {
  const { t } = useLanguage()
  return (
    <Link href="/studio/index.html" target="_blank">
      <Button
        onClick={onClick}
        className={cn(
          "bg-gradient-to-r from-primary to-accent text-white",
          "hover:opacity-90 transition-opacity",
          "font-medium px-6 py-2.5",
          className
        )}
        aria-label="Create new video"
      >
        <Sparkles className="w-4 h-4" aria-hidden="true" />
        <span>{t('create')}</span>
      </Button>
    </Link>
  )
}
