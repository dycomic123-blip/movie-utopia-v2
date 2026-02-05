'use client'

import { Heart } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface LikeButtonProps {
  videoId: string
}

export function LikeButton({ videoId }: LikeButtonProps) {
  const { likedVideos, toggleLike } = useAppStore()
  const isLiked = likedVideos.has(videoId)
  const [showParticles, setShowParticles] = useState(false)

  const handleLike = () => {
    toggleLike(videoId)
    if (!isLiked) {
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 500)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={handleLike}
        className="gap-2"
        aria-label={isLiked ? 'Unlike video' : 'Like video'}
      >
        <motion.div
          animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </motion.div>
        {isLiked ? 'Liked' : 'Like'}
      </Button>

      {/* Particle burst animation */}
      <AnimatePresence>
        {showParticles && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8
              const distance = 40
              const x = Math.cos((angle * Math.PI) / 180) * distance
              const y = Math.sin((angle * Math.PI) / 180) * distance

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x, y, scale: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
