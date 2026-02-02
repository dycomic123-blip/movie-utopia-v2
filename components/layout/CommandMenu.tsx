'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Clapperboard,
  Palette,
  HelpCircle,
  ArrowRight
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useAppStore } from '@/lib/store'

export function CommandMenu() {
  const router = useRouter()
  const { isCommandMenuOpen, setCommandMenuOpen } = useAppStore()
  const [isMac, setIsMac] = useState(false)

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    const platform = window.navigator.platform
    const userAgent = window.navigator.userAgent
    setIsMac(/Mac|iPhone|iPad|iPod/.test(platform) || /Mac/.test(userAgent))
  }, [])

  // Register keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandMenuOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setCommandMenuOpen])

  const handleSelect = useCallback((callback: () => void) => {
    setCommandMenuOpen(false)
    callback()
  }, [setCommandMenuOpen])

  return (
    <Dialog open={isCommandMenuOpen} onOpenChange={setCommandMenuOpen}>
      <DialogContent
        className="p-0 glass backdrop-blur-xl border-white/10 overflow-hidden max-w-2xl"
        aria-describedby="command-menu-description"
      >
        <span id="command-menu-description" className="sr-only">
          Quick command palette. Press {isMac ? 'Command' : 'Control'} K to open.
        </span>

        <Command className="bg-transparent">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-muted-foreground mr-2" aria-hidden="true" />
            <CommandInput
              placeholder="Type a command or search..."
              className="border-0 focus:ring-0 bg-transparent"
            />
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 text-xs font-medium text-muted-foreground">
              {isMac ? '⌘' : 'Ctrl'}K
            </kbd>
          </div>

          <CommandList className="max-h-[400px] p-2">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </CommandEmpty>

            <CommandGroup heading="Actions">
              <CommandItem
                onSelect={() => handleSelect(() => {
                  document.querySelector<HTMLInputElement>('[placeholder*="command"]')?.focus()
                })}
                className="cursor-pointer"
              >
                <Search className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Search</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" aria-hidden="true" />
              </CommandItem>

              <CommandItem
                onSelect={() => handleSelect(() => router.push('/studio'))}
                className="cursor-pointer"
              >
                <Clapperboard className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Go to Studio</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" aria-hidden="true" />
              </CommandItem>

              <CommandItem
                onSelect={() => handleSelect(() => console.log('Toggle theme'))}
                className="cursor-pointer"
              >
                <Palette className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Toggle Theme</span>
                <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
              </CommandItem>

              <CommandItem
                onSelect={() => handleSelect(() => console.log('Open help'))}
                className="cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Help</span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" aria-hidden="true" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
