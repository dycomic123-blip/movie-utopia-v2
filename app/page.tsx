import { HeroBillboard } from '@/components/features/home/HeroBillboard'
import { MasonryFeed } from '@/components/features/home/MasonryFeed'
import { ScrollRestorer } from '@/components/features/home/ScrollRestorer'
import { generateMockCreators } from '@/lib/data/mockCreators'
import { getMockHeroContent } from '@/lib/data/mockHeroContent'
import { mockCommunityItems } from '@/lib/data/mockCommunity'
import { mockBounties } from '@/lib/data/mockBounties'
import { mapVideoToItem } from '@/lib/db/videoMapper'
import { getHomeVideos } from '@/lib/db/homeQueries'

export const revalidate = 30

export default async function HomePage() {
  const [videoRecords, creators, heroContent] = await Promise.all([
    getHomeVideos(),
    Promise.resolve(generateMockCreators()),
    Promise.resolve(getMockHeroContent())
  ])

  const videos = videoRecords.map(mapVideoToItem)

  // 分离社区数据
  const challenges = mockCommunityItems.filter((item) => item.type === 'challenge')
  const posts = mockCommunityItems.filter((item) => item.type === 'post')
  const bounties = mockBounties

  return (
    <div className="min-h-screen">
      <ScrollRestorer />
      <HeroBillboard content={heroContent} />

      {/* 视频瀑布流（包含排行榜和社区Hub卡片） */}
      <div className="container mx-auto px-3 py-16 max-w-[1800px]">
        <MasonryFeed
          videos={videos}
          creators={creators}
          communityData={{
            challenges,
            bounties,
            posts,
          }}
        />
      </div>
    </div>
  )
}
