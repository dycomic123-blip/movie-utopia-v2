'use client'

import { Button } from '@/components/ui/button'
import { TimelineMockup } from './TimelineMockup'
import { Download, RotateCcw } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function StudioStep3() {
  const router = useRouter()
  const { setStudioStep, setStudioPrompt } = useAppStore()

  const handleExport = () => {
    toast.success('Video exported successfully!')
    // Navigate to home after a short delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }

  const handleStartOver = () => {
    setStudioPrompt('')
    setStudioStep(1)
  }

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="rounded-lg border border-green-800 bg-green-950/20 p-4 text-center">
        <h2 className="mb-2 text-xl font-medium text-green-400">
          Your video is ready!
        </h2>
        <p className="text-sm text-neutral-400">
          Use the editor below to fine-tune your creation
        </p>
      </div>

      {/* Timeline Editor Mockup */}
      <TimelineMockup />

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={handleExport}
          size="lg"
          className="flex-1 gap-2 text-base"
        >
          <Download className="h-5 w-5" />
          Export Video
        </Button>

        <Button
          onClick={handleStartOver}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Start Over
        </Button>
      </div>

      <p className="text-center text-xs text-neutral-500">
        Pro tip: You can also download this video in 4K quality from your dashboard
      </p>
    </div>
  )
}
