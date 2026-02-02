'use client'

import { Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { VideoItem } from '@/lib/types/video'
import { useState } from 'react'
import { toast } from 'sonner'

interface ShareButtonProps {
  video: VideoItem
}

export function ShareButton({ video }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const videoUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/video/${video.id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleShareTwitter = () => {
    const text = `Check out "${video.title}" by ${video.author.name} on Movie Utopia!`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(videoUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 border-neutral-800 bg-[#141414]">
        <div className="space-y-2">
          <h4 className="mb-3 text-sm font-medium">Share this video</h4>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleShareTwitter}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on Twitter
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleShareFacebook}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" />
            </svg>
            Share on Facebook
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
