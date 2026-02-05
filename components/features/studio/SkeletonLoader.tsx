'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="h-[200px] overflow-hidden rounded-lg bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}
