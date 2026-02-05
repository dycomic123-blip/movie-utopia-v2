'use client'

import { useState, useEffect, useRef } from 'react'
import { HeroContent } from '@/lib/types/video'
import { Button } from '@/components/ui/button'
import { Play, Volume2, VolumeX, ChevronDown } from 'lucide-react'
import { GenreBadge } from './GenreBadge'

interface HeroBillboardProps {
  content: HeroContent
}

export function HeroBillboard({ content }: HeroBillboardProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
      videoRef.current?.play()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const scrollToContent = () => {
    const heroHeight = window.innerHeight * 0.8 // 80vh
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative w-screen h-[80vh] overflow-hidden bg-black">
      {/* Cover Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-[800ms] ${
          showVideo ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <img
          src={content.coverImage}
          alt={content.title}
          className="w-full h-full object-cover md:object-cover"
        />
      </div>

      {/* Video */}
      <video
        ref={videoRef}
        src={content.videoUrl}
        
        loop
        muted={isMuted}
        playsInline
        className={`absolute inset-0 w-full h-full object-cover md:object-cover transition-opacity duration-[800ms] ${
          showVideo ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* Main Brand Title with Fluid Typography and Clip Mask Effect */}
            <h1 className="hero-title font-serif font-extrabold mb-6 tracking-wider animate-fade-in">
              MOVIE UTOPIA
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle font-medium tracking-widest uppercase mb-10 animate-fade-in-delay">
              ALL FOR MOVIE · ONLY FOR MOVIE
            </p>

            {/* CTA Button - Matching TAB style */}
            <Button
              onClick={scrollToContent}
              size="lg"
              className="gap-3 bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-all font-medium px-8 py-6 text-lg shadow-xl shadow-primary/20 animate-fade-in-delay-2 group"
            >
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>Explore Videos</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mute Toggle Button - Only visible when video is playing */}
      {/* {showVideo && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-white" />
          ) : (
            <Volume2 className="h-5 w-5 text-white" />
          )}
        </button>
      )} */}
    </section>
  )
}
