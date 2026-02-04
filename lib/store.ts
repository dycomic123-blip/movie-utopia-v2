import { create } from 'zustand'

interface AppStore {
  credits: number
  setCredits: (credits: number) => void
  deductCredits: (amount: number) => void
  isCommandMenuOpen: boolean
  setCommandMenuOpen: (open: boolean) => void

  // Video Modal State
  activeVideoId: string | null
  setActiveVideoId: (id: string | null) => void
  likedVideos: Set<string>
  toggleLike: (videoId: string) => void

  // Studio State
  studioStep: 1 | 2 | 3
  setStudioStep: (step: 1 | 2 | 3) => void
  studioPrompt: string
  setStudioPrompt: (prompt: string) => void
  remixSourceId: string | null
  setRemixSourceId: (id: string | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
  credits: 1888, // Mock initial value
  setCredits: (credits) => set({ credits }),
  deductCredits: (amount) => set((state) => ({
    credits: Math.max(0, state.credits - amount)
  })),
  isCommandMenuOpen: false,
  setCommandMenuOpen: (open) => set({ isCommandMenuOpen: open }),

  // Video Modal State
  activeVideoId: null,
  setActiveVideoId: (id) => set({ activeVideoId: id }),
  likedVideos: new Set<string>(),
  toggleLike: (videoId) => set((state) => {
    const newLikedVideos = new Set(state.likedVideos)
    if (newLikedVideos.has(videoId)) {
      newLikedVideos.delete(videoId)
    } else {
      newLikedVideos.add(videoId)
    }
    return { likedVideos: newLikedVideos }
  }),

  // Studio State
  studioStep: 1,
  setStudioStep: (step) => set({ studioStep: step }),
  studioPrompt: '',
  setStudioPrompt: (prompt) => set({ studioPrompt: prompt }),
  remixSourceId: null,
  setRemixSourceId: (id) => set({ remixSourceId: id }),
}))
