'use client'

import { VideoItem } from '@/lib/types/video'
import { useEffect, useRef, useState } from 'react'

interface VideoPlayerProps {
  video: VideoItem
}

/**
 * 跨平台兼容的视频播放器组件
 * 支持 Windows、Mac、iOS、Android
 */
export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = (e: Event) => {
      console.error('Video playback error:', e)
      setError('Unable to play this video. Please try again later.')
      setIsLoading(false)
    }

    videoElement.addEventListener('loadstart', handleLoadStart)
    videoElement.addEventListener('canplay', handleCanPlay)
    videoElement.addEventListener('error', handleError)

    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart)
      videoElement.removeEventListener('canplay', handleCanPlay)
      videoElement.removeEventListener('error', handleError)
    }
  }, [video.videoUrl])

  // 检测是否为移动设备
  const isMobile = typeof window !== 'undefined'
    ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    : false

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/80 text-sm">Loading video...</p>
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/80">
          <div className="text-center px-6">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white text-lg font-semibold mb-2">Playback Error</p>
            <p className="text-white/60 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* 视频播放器 */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        controlsList="nodownload" // 防止下载 (可选)
        disablePictureInPicture={false}
        autoPlay
        loop
        playsInline // iOS 内联播放 (关键!)
        // @ts-ignore - webkit 前缀属性
        webkit-playsinline="true" // 旧版 iOS 支持
        preload={isMobile ? 'metadata' : 'auto'} // 移动端节省流量
        poster={video.thumbnail} // 视频封面
      >
        {/* 主要格式: MP4 with H.264 */}
        <source
          src={video.videoUrl}
          type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
        />

        {/* 备用格式: WebM (如果有) */}
        {video.videoUrl.endsWith('.mp4') && (
          <source
            src={video.videoUrl.replace('.mp4', '.webm')}
            type="video/webm; codecs=vp9,opus"
          />
        )}

        {/* 降级提示 */}
        <div className="text-white text-center p-8">
          <p className="mb-4">Your browser does not support the video tag.</p>
          <p className="text-sm text-white/60">
            Please try using a modern browser like Chrome, Firefox, Safari, or Edge.
          </p>
        </div>
      </video>
    </div>
  )
}
