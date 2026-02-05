'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useUserProfile } from '@/components/features/auth/UserProfileProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

export function UserNav() {
  const { t } = useLanguage()
  const { logout } = useAuth()
  const { profile } = useUserProfile()

  const handleLogout = () => {
    logout()
  }

  const initials = useMemo(() => {
    const name = profile?.name?.trim()
    if (!name) return 'UU'
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }, [profile?.name])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="User menu"
        >
          <Avatar className="ring-2 ring-accent/50 ring-offset-2 ring-offset-background">
            <AvatarImage src={profile?.avatar ?? ''} alt={profile?.name ?? 'User avatar'} />
            <AvatarFallback className="bg-primary text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 glass backdrop-blur-xl border-white/10"
      >
        <DropdownMenuLabel className="font-sans">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-white">{profile?.name ?? 'My Account'}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/10">
          <Link href="/profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>{t('Profile')}</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
          <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>{t('Settings')}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          className="cursor-pointer hover:bg-white/10 text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>{t('Logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
