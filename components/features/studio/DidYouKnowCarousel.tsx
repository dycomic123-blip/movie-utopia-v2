'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FACTS = [
  'Movie Utopia uses state-of-the-art AI models trained on millions of video clips.',
  'The average video generation takes 8-12 seconds depending on complexity.',
  'You can remix any video on the platform to create your own unique version.',
  'Over 10,000 creators have already joined the Movie Utopia community.',
  'AI-generated videos can be up to 60 seconds long in premium mode.',
  'Our AI understands cinematic techniques like camera angles and lighting.',
]

export function DidYouKnowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FACTS.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-[80px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center text-neutral-300"
        >
          {FACTS[currentIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Dots Indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {FACTS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-violet-500'
                : 'w-2 bg-neutral-700 hover:bg-neutral-600'
            }`}
            aria-label={`Go to fact ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
