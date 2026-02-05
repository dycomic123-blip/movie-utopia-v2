'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ScrollRestorer() {
  const router = useRouter()

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('homeScrollPosition')
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({ top: Number(savedPosition), behavior: 'instant' })
        sessionStorage.removeItem('homeScrollPosition')
      }, 0)
    }

    const shouldRefresh = sessionStorage.getItem('homeNeedsRefresh')
    if (shouldRefresh) {
      sessionStorage.removeItem('homeNeedsRefresh')
      router.refresh()
    }
  }, [])

  return null
}
