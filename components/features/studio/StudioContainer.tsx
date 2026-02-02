'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { VideoItem } from '@/lib/types/video'
import { StudioStepIndicator } from './StudioStepIndicator'
import { StudioStep1 } from './StudioStep1'
import { StudioStep2 } from './StudioStep2'
import { StudioStep3 } from './StudioStep3'

interface StudioContainerProps {
  remixSourceId: string | null
  sourceVideo?: VideoItem
}

export function StudioContainer({ remixSourceId, sourceVideo }: StudioContainerProps) {
  const { studioStep, setRemixSourceId, setStudioStep } = useAppStore()

  useEffect(() => {
    setRemixSourceId(remixSourceId)
    setStudioStep(1) // Reset to step 1 on mount
  }, [remixSourceId, setRemixSourceId, setStudioStep])

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-serif text-4xl font-bold">
            {remixSourceId ? 'Remix Video' : 'Create New Video'}
          </h1>
          <p className="text-neutral-400">
            {remixSourceId
              ? `Create your own version of "${sourceVideo?.title}"`
              : 'Turn your imagination into reality with AI'}
          </p>
        </div>

        {/* Step Indicator */}
        <StudioStepIndicator currentStep={studioStep} />

        {/* Step Content */}
        <div className="mt-8">
          {studioStep === 1 && <StudioStep1 sourceVideo={sourceVideo} />}
          {studioStep === 2 && <StudioStep2 />}
          {studioStep === 3 && <StudioStep3 />}
        </div>
      </div>
    </div>
  )
}
