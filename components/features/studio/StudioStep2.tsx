'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { SkeletonLoader } from './SkeletonLoader'
import { DidYouKnowCarousel } from './DidYouKnowCarousel'

export function StudioStep2() {
  const setStudioStep = useAppStore((state) => state.setStudioStep)

  useEffect(() => {
    // Simulate video generation delay (8-10 seconds)
    const delay = 8000 + Math.random() * 2000
    const timer = setTimeout(() => {
      setStudioStep(3)
    }, delay)

    return () => clearTimeout(timer)
  }, [setStudioStep])

  return (
    <div className="space-y-8">
      {/* Skeleton Loader */}
      <div className="space-y-4">
        <h2 className="text-center text-xl font-medium">
          Generating your video...
        </h2>
        <SkeletonLoader />
      </div>

      {/* Did You Know Carousel */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
        <h3 className="mb-4 text-center text-lg font-medium text-violet-400">
          Did you know?
        </h3>
        <DidYouKnowCarousel />
      </div>
    </div>
  )
}
