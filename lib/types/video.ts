export interface VideoItem {
  id: string
  title: string
  author: {
    id: string
    name: string
    avatar: string
    followers: number
  }
  thumbnail: string
  videoUrl: string
  genre: 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Horror' | 'Romance' | 'Thriller'
  likes: number
  tips: number // Total tips received
  aspectRatio: number // 16/9, 9/16, or 21/9
  duration: number
  createdAt: string
  remixParent?: {
    videoId: string
    authorId: string
    authorName: string
  }
}

export interface Creator {
  id: string
  name: string
  avatar: string
  remixCount: number
  totalTips: number      // 总打赏金额
  totalLikes: number     // 总点赞数
  rank: number
}

export interface HeroContent {
  id: string
  title: string
  description: string
  coverImage: string
  videoUrl: string
  genre: string
}
