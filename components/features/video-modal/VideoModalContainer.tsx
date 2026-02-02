'use client'

import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { VideoPlayer } from './VideoPlayer'
import { VideoSidebar } from './VideoSidebar'
import { VideoModalFooter } from './VideoModalFooter'
import { LineageBanner } from './LineageBanner'
import { VideoItem } from '@/lib/types/video'
import { X } from 'lucide-react'
import { useAppStore } from '@/lib/store'

interface VideoModalContainerProps {
  video: VideoItem
}

export function VideoModalContainer({ video }: VideoModalContainerProps) {
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const setActiveVideoId = useAppStore(state => state.setActiveVideoId)

  const handleClose = () => {
    setActiveVideoId(null)
    router.back()
  }

  const modalContent = (
    <>
      {isDesktop ? (
        <div className="flex h-[85vh] max-h-[900px] overflow-hidden">
          {/* Left: Video Player (70%) */}
          <div className="flex w-[70%] flex-col">
            <VideoPlayer video={video} />
          </div>

          {/* Right: Sidebar (30%) */}
          <div className="w-[30%] border-l border-neutral-800">
            <VideoSidebar video={video} />
          </div>
        </div>
      ) : (
        <div className="flex max-h-[90vh] flex-col overflow-hidden">
          <VideoPlayer video={video} />
          <div className="flex-1 overflow-y-auto">
            <VideoSidebar video={video} />
          </div>
        </div>
      )}

      {/* Lineage Banner */}
      {video.remixParent && (
        <LineageBanner remixParent={video.remixParent} />
      )}

      {/* Footer */}
      <VideoModalFooter video={video} />
    </>
  )

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={handleClose}>
        <DialogOverlay className="bg-black/50 backdrop-blur-xl" />
        <DialogContent
          className="max-w-[90vw] border-neutral-800 bg-[#141414] p-0 transition-all duration-[800ms] ease-in-out"
          aria-describedby={`video-modal-${video.id}`}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {modalContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open onOpenChange={handleClose}>
      <DrawerContent className="max-h-[95vh]">
        {modalContent}
      </DrawerContent>
    </Drawer>
  )
}
