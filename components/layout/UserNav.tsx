'use client'

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

export function UserNav() {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

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
            <AvatarImage src="/avatar-placeholder.jpg" alt="User avatar" />
            <AvatarFallback className="bg-primary text-white font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 glass backdrop-blur-xl border-white/10"
      >
        <DropdownMenuLabel className="font-sans">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
          <User className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
          <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          className="cursor-pointer hover:bg-white/10 text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
