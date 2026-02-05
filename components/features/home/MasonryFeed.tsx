'use client'

import { VideoItem, Creator } from '@/lib/types/video'
import { ChallengeCard as ChallengeType } from '@/lib/types/community'
import { PostCard as PostType } from '@/lib/types/community'
import { BountyItem } from '@/lib/types/bounty'
import { VideoCard } from './VideoCard'
import { LeaderboardCardTabs } from './LeaderboardCardTabs'
import { CommunityHubCard } from './CommunityHubCard'
import Masonry from 'react-masonry-css'

interface MasonryFeedProps {
  videos: VideoItem[]
  creators?: Creator[]
  communityData?: {
    challenges: ChallengeType[]
    bounties: BountyItem[]
    posts: PostType[]
  }
}

const breakpointColumns = {
  default: 3,    // 超大屏3列 (>1280px)
  1280: 3,       // 大屏3列
  1024: 2,       // 桌面2列
  768: 2,        // 平板2列
  640: 1         // 手机1列
}

export function MasonryFeed({ videos, creators, communityData }: MasonryFeedProps) {
  // Insert positions
  const LEADERBOARD_POSITION = 6      // 排行榜卡片位置（第7个卡片）
  const COMMUNITY_HUB_POSITION = 13   // 社区Hub卡片位置（第14个卡片，更靠右）

  // Build items array with leaderboard and community hub inserted
  const items = videos.flatMap((video, index) => {
    const videoCard = <VideoCard key={video.id} video={video} />
    const insertedItems = []

    // Insert leaderboard at position 6
    if (index === LEADERBOARD_POSITION && creators) {
      insertedItems.push(
        <LeaderboardCardTabs key="leaderboard-tabs" creators={creators} />
      )
    }

    // Insert community hub at position 12
    if (index === COMMUNITY_HUB_POSITION && communityData) {
      insertedItems.push(
        <CommunityHubCard
          key="community-hub"
          challenges={communityData.challenges}
          bounties={communityData.bounties}
          posts={communityData.posts}
        />
      )
    }

    // Return inserted items first, then the video card
    return [...insertedItems, videoCard]
  })

  return (
    <section aria-label="Video gallery" className="masonry-section">
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {items}
      </Masonry>
    </section>
  )
}
