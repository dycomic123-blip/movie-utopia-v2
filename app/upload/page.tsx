'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Film, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/features/auth/AuthProvider'

const GENRES = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller'] as const

export default function UploadPage() {
  const router = useRouter()
  const { currentUserId } = useAuth()
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState<(typeof GENRES)[number]>('Drama')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [durationSec, setDurationSec] = useState<number | null>(null)
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!videoFile) {
      setVideoPreviewUrl(null)
      setDurationSec(null)
      setAspectRatio(null)
      return
    }

    const url = URL.createObjectURL(videoFile)
    setVideoPreviewUrl(url)

    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = url
    video.onloadedmetadata = () => {
      setDurationSec(Math.round(video.duration))
      if (video.videoWidth && video.videoHeight) {
        setAspectRatio(Number((video.videoWidth / video.videoHeight).toFixed(4)))
      }
    }

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [videoFile])

  const canSubmit = useMemo(() => {
    return Boolean(currentUserId && title.trim() && videoFile && !isSubmitting)
  }, [currentUserId, title, videoFile, isSubmitting])

  const handleUploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch('/api/uploads', {
      method: 'POST',
      body: formData
    })
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    const data = await response.json()
    return data.url as string
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!currentUserId || !videoFile) return

    setIsSubmitting(true)
    try {
      const [videoUrl, thumbnailUrl] = await Promise.all([
        handleUploadFile(videoFile),
        thumbnailFile ? handleUploadFile(thumbnailFile) : Promise.resolve('/hero-image.jpg')
      ])

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: Number(currentUserId),
          title: title.trim(),
          thumbnailUrl,
          videoUrl,
          genre,
          aspectRatio,
          durationSec
        })
      })

      if (!response.ok) {
        throw new Error('Create video failed')
      }

      const created = await response.json()
      router.push(`/video/${created.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="glass-premium rounded-3xl border border-white/10 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-white">Upload Video</h1>
            <p className="text-sm text-neutral-400 mt-2">
              上传视频并填写标题、类型等信息，系统会自动读取时长与比例。
            </p>
          </div>

          {!currentUserId && (
            <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              请先登录后再上传。
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">标题</label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="给你的视频取个名字"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">类型</label>
                <select
                  value={genre}
                  onChange={(event) => setGenre(event.target.value as (typeof GENRES)[number])}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-primary"
                >
                  {GENRES.map((item) => (
                    <option key={item} value={item} className="bg-neutral-900">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">封面图（可选）</label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                  <ImageIcon className="h-4 w-4 text-accent" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)}
                    className="w-full text-xs text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:text-white hover:file:bg-white/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">视频文件</label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                <Film className="h-4 w-4 text-accent" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)}
                  className="w-full text-xs text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:text-white hover:file:bg-white/20"
                />
              </div>
            </div>

            {videoPreviewUrl && (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <video src={videoPreviewUrl} controls className="w-full rounded-xl" />
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-300">
                  <span>时长：{durationSec ?? '-'}s</span>
                  <span>比例：{aspectRatio ?? '-'}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                className="text-neutral-300 hover:text-white"
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button
                type="submit"
                disabled={!canSubmit}
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                <Upload className="h-4 w-4" />
                {isSubmitting ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
