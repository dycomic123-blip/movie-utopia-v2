'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors"
        aria-label={t('language')}
        onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
      >
        <Globe className="w-4 h-4 hidden sm:inline" />
        <span>{locale === 'en' ? 'EN' : '中'}</span>
      </button>
    </div>
  )
}
