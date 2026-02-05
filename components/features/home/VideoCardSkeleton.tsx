import { Skeleton } from '@/components/ui/skeleton'

export function VideoCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-card shadow-md h-full flex flex-col">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
            <Skeleton className="h-3 w-20 bg-white/20" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-3 w-12 bg-white/20" />
            <Skeleton className="h-3 w-12 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  )
}
