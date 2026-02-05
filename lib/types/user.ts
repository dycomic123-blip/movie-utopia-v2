export interface UserProfile {
    id: number
    name: string
    avatar?: string | null
    walletBalance?: string | number | null
    followersCount?: number
    followingCount?: number
}