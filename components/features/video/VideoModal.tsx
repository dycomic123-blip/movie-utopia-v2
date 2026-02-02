'use client'

import { useState } from 'react'
import { VideoItem, Creator } from '@/lib/types/video'
import { X } from 'lucide-react'
import { VideoPlayer } from './VideoPlayer'
import { VideoSidebar } from './VideoSidebar'

interface VideoModalProps {
  video: VideoItem
  creators: Creator[]
  relatedVideos: VideoItem[]
  onClose: () => void
}

export function VideoModal({ video, creators, relatedVideos, onClose }: VideoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      {/* Modal Container - Cinematic Aspect Ratio */}
      <div className="relative w-full max-w-[95vw] h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden flex">

        {/* Close Button - Top Left Above Content */}
        <button
          onClick={onClose}
          className="absolute top-2 left-2 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors backdrop-blur-sm ring-1 ring-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side - Video Player (75%) - Cinematic */}
        <div className="w-[75%] bg-black flex items-center justify-center">
          <VideoPlayer video={video} />
        </div>

        {/* Right Side - Interactive Sidebar (25%) - Compact */}
        <div className="w-[25%] flex flex-col bg-card">
          <VideoSidebar
            video={video}
            creators={creators}
            relatedVideos={relatedVideos}
          />
        </div>
      </div>
    </div>
  )
}
