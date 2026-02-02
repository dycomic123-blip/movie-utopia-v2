'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VideoItem } from '@/lib/types/video'
import { RelatedVideos } from './RelatedVideos'
import { GenreCloud } from './GenreCloud'
import { TopTenList } from './TopTenList'

interface SidebarTabsProps {
  video: VideoItem
}

export function SidebarTabs({ video }: SidebarTabsProps) {
  return (
    <Tabs defaultValue="related" className="flex h-full flex-col">
      <TabsList className="w-full justify-start border-b border-neutral-800 rounded-none bg-transparent px-4">
        <TabsTrigger value="related">Related</TabsTrigger>
        <TabsTrigger value="genres">Genres</TabsTrigger>
        <TabsTrigger value="top10">Top 10</TabsTrigger>
      </TabsList>

      <div className="flex-1 overflow-y-auto p-4">
        <TabsContent value="related" className="mt-0">
          <RelatedVideos currentVideo={video} />
        </TabsContent>

        <TabsContent value="genres" className="mt-0">
          <GenreCloud currentVideo={video} />
        </TabsContent>

        <TabsContent value="top10" className="mt-0">
          <TopTenList />
        </TabsContent>
      </div>
    </Tabs>
  )
}
