'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { CreditBalance } from './CreditBalance'
import { CreateButton } from './CreateButton'
import { UserNav } from './UserNav'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const setCommandMenuOpen = useAppStore((state) => state.setCommandMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Movie Utopia Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <span className="text-xl font-serif font-extrabold text-white uppercase tracking-wide">
                MOVIE UTOPIA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search trigger for CommandMenu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCommandMenuOpen(true)}
              aria-label="Open search"
              className="hidden sm:flex"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </Button>

            <CreditBalance />
            <CreateButton onClick={() => console.log('Navigate to /studio')} />
            <UserNav />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
