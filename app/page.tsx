'use client'

import { useMemo, useEffect } from 'react'
import { HeroBillboard } from '@/components/features/home/HeroBillboard'
import { MasonryFeed } from '@/components/features/home/MasonryFeed'
import { CommunityHubCard } from '@/components/features/home/CommunityHubCard'
import { generateMockVideos } from '@/lib/data/mockVideos'
import { generateMockCreators } from '@/lib/data/mockCreators'
import { getMockHeroContent } from '@/lib/data/mockHeroContent'
import { mockCommunityItems } from '@/lib/data/mockCommunity'
import { mockBounties } from '@/lib/data/mockBounties'

export default function HomePage() {
  const videos = useMemo(() => generateMockVideos(), [])
  const creators = useMemo(() => generateMockCreators(), [])
  const heroContent = useMemo(() => getMockHeroContent(), [])

  // 分离社区数据
  const challenges = useMemo(() => mockCommunityItems.filter(item => item.type === 'challenge'), [])
  const posts = useMemo(() => mockCommunityItems.filter(item => item.type === 'post'), [])
  const bounties = useMemo(() => mockBounties, [])

  // Restore scroll position when returning from video page
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('homeScrollPosition')
    if (savedPosition) {
      // Instant positioning without scrolling animation
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' })
        sessionStorage.removeItem('homeScrollPosition')
      }, 0)
    }
  }, [])

  return (
    <div className="min-h-screen">
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
