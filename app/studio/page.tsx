'use client'

import { useEffect, useState } from 'react'

export default function StudioPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Hide loading after iframe loads
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
            <p className="mt-4 text-sm text-zinc-400">Loading Studio...</p>
          </div>
        </div>
      )}

      {/* Studio iframe - full screen */}
      <iframe
        src="/studio/index.html"
        className="w-full h-full border-0"
        title="Movie Utopia Studio"
        onLoad={() => setIsLoading(false)}
        style={{ colorScheme: 'dark' }}
      />
    </div>
  )
}
