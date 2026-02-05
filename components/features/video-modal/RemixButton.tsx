'use client'

import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface RemixButtonProps {
  videoId: string
}

export function RemixButton({ videoId }: RemixButtonProps) {
  return (
    <Button asChild size="sm" className="gap-2">
      <Link href={`/studio/${videoId}`}>
        <Sparkles className="h-4 w-4" />
        Remix
      </Link>
    </Button>
  )
}
