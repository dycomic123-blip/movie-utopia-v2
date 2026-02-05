'use client'

import { Scissors, Sparkles, Type, Volume2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TimelineMockup() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
      {/* Video Preview */}
      <div className="aspect-video w-full bg-black p-4">
        <div className="flex h-full items-center justify-center rounded bg-neutral-900">
          <Play className="h-16 w-16 text-neutral-600" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-t border-neutral-800 p-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Scissors className="h-4 w-4" />
            Trim
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Scissors className="h-4 w-4" />
            Split
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Effects
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Type className="h-4 w-4" />
            Text
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Volume2 className="h-4 w-4" />
            Audio
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-neutral-800 p-4">
        <div className="space-y-2">
          {/* Video Track */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-neutral-500">Video</span>
            <div className="relative h-12 flex-1 rounded bg-violet-900/30">
              <div className="absolute inset-y-0 left-4 right-4 flex items-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="h-8 flex-1 rounded-sm bg-violet-600/50" />
                ))}
              </div>
            </div>
          </div>

          {/* Audio Track */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-neutral-500">Audio</span>
            <div className="relative h-12 flex-1 rounded bg-amber-900/30">
              <svg className="h-full w-full px-4" viewBox="0 0 200 48">
                <path
                  d="M 0,24 L 10,20 L 20,28 L 30,18 L 40,30 L 50,10 L 60,32 L 70,15 L 80,28 L 90,20 L 100,24 L 110,18 L 120,30 L 130,22 L 140,26 L 150,20 L 160,28 L 170,22 L 180,25 L 190,23 L 200,24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-amber-600/50"
                />
              </svg>
            </div>
          </div>

          {/* Text Track */}
          <div className="flex items-center gap-2">
            <span className="w-16 text-xs text-neutral-500">Text</span>
            <div className="relative h-12 flex-1 rounded bg-blue-900/30">
              <div className="absolute inset-y-0 left-8 right-8 flex items-center gap-4">
                <div className="h-6 w-20 rounded bg-blue-600/50" />
                <div className="h-6 w-32 rounded bg-blue-600/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Playhead */}
        <div className="relative mt-4 h-1 w-full rounded-full bg-neutral-800">
          <div className="absolute left-1/3 top-1/2 h-8 w-0.5 -translate-y-1/2 bg-white shadow-lg" />
        </div>
      </div>
    </div>
  )
}
