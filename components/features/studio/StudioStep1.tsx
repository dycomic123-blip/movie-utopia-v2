'use client'

import { useState } from 'react'
import { VideoItem } from '@/lib/types/video'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles } from 'lucide-react'

interface StudioStep1Props {
  sourceVideo?: VideoItem
}

export function StudioStep1({ sourceVideo }: StudioStep1Props) {
  const { studioPrompt, setStudioPrompt, setStudioStep } = useAppStore()
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleGenerate = () => {
    if (!agreedToTerms || !studioPrompt.trim()) return
    setStudioStep(2)
  }

  const isValid = agreedToTerms && studioPrompt.trim().length > 0

  return (
    <div className="space-y-6">
      {/* Source Video Preview (if remix) */}
      {sourceVideo && (
        <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <p className="mb-3 text-sm text-neutral-400">Remixing from:</p>
          <div className="flex gap-4">
            <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded bg-neutral-800">
              <img
                src={sourceVideo.thumbnail}
                alt={sourceVideo.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-1 font-medium">{sourceVideo.title}</h3>
              <p className="text-sm text-neutral-400">by {sourceVideo.author.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium">
          Describe your vision
        </label>
        <Textarea
          id="prompt"
          placeholder={
            sourceVideo
              ? `Describe how you want to remix "${sourceVideo.title}"...`
              : 'A cinematic scene of a lone astronaut floating in space, surrounded by distant galaxies...'
          }
          value={studioPrompt}
          onChange={(e) => setStudioPrompt(e.target.value)}
          className="min-h-[200px] resize-none border-neutral-800 bg-neutral-900/50"
          maxLength={500}
        />
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>{studioPrompt.length}/500 characters</span>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed">
          I agree to the{' '}
          <a href="/terms" className="text-violet-400 hover:underline">
            Terms & Conditions
          </a>{' '}
          and confirm that I have the rights to create this content.
        </label>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!isValid}
        size="lg"
        className="w-full gap-2 text-base"
      >
        <Sparkles className="h-5 w-5" />
        Generate Video
      </Button>

      {!isValid && (
        <p className="text-center text-sm text-neutral-500">
          {!studioPrompt.trim()
            ? 'Please enter a prompt'
            : !agreedToTerms
              ? 'Please agree to the terms to continue'
              : ''}
        </p>
      )}
    </div>
  )
}
