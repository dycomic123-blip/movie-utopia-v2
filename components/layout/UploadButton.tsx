'use client'

import Link from 'next/link'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface UploadButtonProps {
  className?: string
}

export function UploadButton({ className }: UploadButtonProps) {
  const { t } = useLanguage()

  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white",
        "backdrop-blur-md",
        "font-medium px-5 py-2.5",
        className
      )}
      aria-label={t('upload')}
    >
      <Link href="/upload" prefetch>
        <Upload className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">{t('upload')}</span>
      </Link>
    </Button>
  )
}
