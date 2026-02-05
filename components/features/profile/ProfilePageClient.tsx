'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Users, UserPlus, Coins } from 'lucide-react'
import { VideoItem } from '@/lib/types/video'
import { VideoCard } from '@/components/features/home/VideoCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useUserProfile } from '@/components/features/auth/UserProfileProvider'
import { UserProfile } from '@/lib/types/user'
import { cn } from '@/lib/utils'

interface ProfileUserProfile extends UserProfile {
  followersCount: number
  followingCount: number
}

interface UserListItem {
  id: number
  name: string
  avatar?: string | null
  followersCount: number
}

interface ProfilePageClientProps {
  userId: number | null
}

export function ProfilePageClient({ userId }: ProfilePageClientProps) {
  const { currentUserId } = useAuth()
  const { profile: currentUserProfile } = useUserProfile()
  const numericCurrentUserId = useMemo(() => Number(currentUserId), [currentUserId])
  const [profile, setProfile] = useState<ProfileUserProfile | null>(null)
  const [activeTab, setActiveTab] = useState<'works' | 'likes'>('works')
  const [works, setWorks] = useState<VideoItem[]>([])
  const [likes, setLikes] = useState<VideoItem[]>([])
  const [isLoadingWorks, setIsLoadingWorks] = useState(false)
  const [isLoadingLikes, setIsLoadingLikes] = useState(false)
  const [hasLoadedWorks, setHasLoadedWorks] = useState(false)
  const [hasLoadedLikes, setHasLoadedLikes] = useState(false)
  const [followers, setFollowers] = useState<UserListItem[]>([])
  const [following, setFollowing] = useState<UserListItem[]>([])
  const [tipsReceived, setTipsReceived] = useState(0)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  const numericUserId = useMemo(() => (userId ? Number(userId) : NaN), [userId])
  const isSelf = Number.isInteger(numericCurrentUserId) && numericCurrentUserId === numericUserId

  // 如果查看的是自己的 profile，使用 UserProfileProvider 的数据，避免重复调用
  useEffect(() => {
    if (isSelf && currentUserProfile) {
      // 使用 UserProfileProvider 的数据
      // API 返回的数据包含 followersCount 和 followingCount，但类型定义中是可选的
      setProfile({
        id: currentUserProfile.id,
        name: currentUserProfile.name,
        avatar: currentUserProfile.avatar,
        followersCount: (currentUserProfile as any).followersCount ?? 0,
        followingCount: (currentUserProfile as any).followingCount ?? 0
      })
      return
    }

    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      setProfile(null)
      return
    }

    let isMounted = true

    const loadProfile = async () => {
      try {
        const response = await fetch(`/api/users/${numericUserId}`)
        if (!response.ok) throw new Error('Failed to load profile')
        const data = await response.json()
        if (isMounted) {
          setProfile({
            id: data.id,
            name: data.name,
            avatar: data.avatar,
            followersCount: data.followersCount ?? 0,
            followingCount: data.followingCount ?? 0
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [numericUserId, isSelf, currentUserProfile])

  useEffect(() => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      setTipsReceived(0)
      return
    }

    let isMounted = true

    const loadTips = async () => {
      try {
        const response = await fetch(`/api/users/${numericUserId}/tips-received`)
        if (!response.ok) throw new Error('Failed to load tips')
        const data = await response.json()
        if (isMounted) setTipsReceived(Number(data?.total ?? 0))
      } catch (error) {
        console.error(error)
      }
    }

    loadTips()

    return () => {
      isMounted = false
    }
  }, [numericUserId])

  useEffect(() => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) return

    let isMounted = true

    const loadWorks = async () => {
      if (hasLoadedWorks) return // 如果已经加载过，不再重新加载
      try {
        setIsLoadingWorks(true)
        const response = await fetch(`/api/users/${numericUserId}/videos`)
        if (!response.ok) throw new Error('Failed to load works')
        const data = await response.json()
        if (isMounted) {
          setWorks(data.items ?? [])
          setIsLoadingWorks(false)
          setHasLoadedWorks(true)
        }
      } catch (error) {
        console.error(error)
        if (isMounted) {
          setIsLoadingWorks(false)
          setHasLoadedWorks(true)
        }
      }
    }

    const loadLikes = async () => {
      if (hasLoadedLikes) return // 如果已经加载过，不再重新加载
      try {
        setIsLoadingLikes(true)
        const response = await fetch(`/api/users/${numericUserId}/likes`)
        if (!response.ok) throw new Error('Failed to load likes')
        const data = await response.json()
        if (isMounted) {
          setLikes(data.items ?? [])
          setIsLoadingLikes(false)
          setHasLoadedLikes(true)
        }
      } catch (error) {
        console.error(error)
        if (isMounted) {
          setIsLoadingLikes(false)
          setHasLoadedLikes(true)
        }
      }
    }

    // 初始加载时，只加载当前激活标签页的数据
    // 如果切换标签页且数据未加载，则加载对应数据
    if (activeTab === 'works' && !hasLoadedWorks) {
      loadWorks()
    } else if (activeTab === 'likes' && !hasLoadedLikes) {
      loadLikes()
    }

    return () => {
      isMounted = false
    }
  }, [numericUserId, activeTab, hasLoadedWorks, hasLoadedLikes])

  useEffect(() => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) return

    let isMounted = true

    const loadFollowers = async () => {
      try {
        const response = await fetch(`/api/users/${numericUserId}/followers`)
        if (!response.ok) throw new Error('Failed to load followers')
        const data = await response.json()
        if (isMounted) setFollowers(data.items ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    const loadFollowing = async () => {
      try {
        const response = await fetch(`/api/users/${numericUserId}/following`)
        if (!response.ok) throw new Error('Failed to load following')
        const data = await response.json()
        if (isMounted) setFollowing(data.items ?? [])
      } catch (error) {
        console.error(error)
      }
    }

    loadFollowers()
    loadFollowing()

    return () => {
      isMounted = false
    }
  }, [numericUserId])

  const initials = useMemo(() => {
    const name = profile?.name?.trim()
    if (!name) return 'UU'
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }, [profile?.name])

  const handleRemoveFollower = async (followerId: number) => {
    if (!isSelf) return
    try {
      const response = await fetch(`/api/follows?followerId=${followerId}&followingId=${numericUserId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Remove follower failed')
      setFollowers((prev) => prev.filter((item) => item.id !== followerId))
      setProfile((prev) => prev ? { ...prev, followersCount: Math.max(0, prev.followersCount - 1) } : prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUnfollow = async (followingId: number) => {
    if (!isSelf) return
    try {
      const response = await fetch(`/api/follows?followerId=${numericUserId}&followingId=${followingId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Unfollow failed')
      setFollowing((prev) => prev.filter((item) => item.id !== followingId))
      setProfile((prev) => prev ? { ...prev, followingCount: Math.max(0, prev.followingCount - 1) } : prev)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen pt-12 pb-16">
      <div className="container mx-auto max-w-7xl px-3">
        <div className="glass-premium rounded-3xl border border-white/10 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-2 ring-white/10">
                <AvatarImage src={profile?.avatar ?? ''} alt={profile?.name ?? 'User'} />
                <AvatarFallback className="bg-primary text-white text-xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-serif font-bold text-white">
                  {profile?.name ?? 'Profile'}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-300">
                  <button
                    type="button"
                    onClick={() => setShowFollowers(true)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <Users className="h-4 w-4 text-accent" />
                    {profile?.followersCount ?? 0} Followers
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFollowing(true)}
                    className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <UserPlus className="h-4 w-4 text-accent" />
                    {profile?.followingCount ?? 0} Following
                  </button>
                  <div className="flex items-center gap-1 text-amber-300">
                    <Coins className="h-4 w-4" />
                    Tips Received {tipsReceived.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('works')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'works'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {isSelf ? 'My Works' : 'Works'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('likes')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === 'likes'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                {isSelf ? 'My Likes' : 'Likes'}
              </button>
            </div>
          </div>

          <div className="mt-8 min-h-[420px]">
            {activeTab === 'works' ? (
              <div className="h-full min-h-[420px]">
                {isLoadingWorks ? (
                  <div className="flex items-center justify-center h-full min-h-[420px]">
                    <p className="text-sm text-neutral-400">Loading...</p>
                  </div>
                ) : works.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[420px]">
                    <p className="text-sm text-neutral-400">No works yet</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {works.map((video) => (
                      <div key={video.id} className="h-full">
                        <VideoCard video={video} fixedHeight />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[420px]">
                {isLoadingLikes ? (
                  <div className="flex items-center justify-center h-full min-h-[420px]">
                    <p className="text-sm text-neutral-400">Loading...</p>
                  </div>
                ) : likes.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[420px]">
                    <p className="text-sm text-neutral-400">No liked videos yet</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {likes.map((video) => (
                      <div key={video.id} className="h-full">
                        <VideoCard video={video} fixedHeight />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showFollowers} onOpenChange={setShowFollowers}>
        <DialogContent className="bg-[#141414] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {followers.length === 0 ? (
              <p className="text-sm text-neutral-400">No followers yet</p>
            ) : (
              followers.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.avatar ?? ''} alt={item.name} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/profile/${item.id}`} className="text-sm font-medium hover:text-white">
                      {item.name}
                    </Link>
                    <p className="text-xs text-neutral-400">{item.followersCount} Followers</p>
                  </div>
                  {isSelf && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFollower(item.id)}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-red-300 hover:bg-white/10"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showFollowing} onOpenChange={setShowFollowing}>
        <DialogContent className="bg-[#141414] border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Following</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {following.length === 0 ? (
              <p className="text-sm text-neutral-400">No following yet</p>
            ) : (
              following.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={item.avatar ?? ''} alt={item.name} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link href={`/profile/${item.id}`} className="text-sm font-medium hover:text-white">
                      {item.name}
                    </Link>
                    <p className="text-xs text-neutral-400">{item.followersCount} Followers</p>
                  </div>
                  {isSelf && (
                    <button
                      type="button"
                      onClick={() => handleUnfollow(item.id)}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-amber-300 hover:bg-white/10"
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
