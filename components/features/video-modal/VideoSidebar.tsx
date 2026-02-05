'use client'

import { VideoItem } from '@/lib/types/video'
import { SidebarTabs } from './SidebarTabs'

interface VideoSidebarProps {
  video: VideoItem
}

export function VideoSidebar({ video }: VideoSidebarProps) {
  return (
    <div className="flex h-full flex-col">
      <SidebarTabs video={video} />
    </div>
  )
}
