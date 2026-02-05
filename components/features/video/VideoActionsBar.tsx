'use client'

import { Heart, Share2, Coins, Repeat2, MoreHorizontal, Facebook, Twitter, Linkedin, Link2, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VideoItem } from '@/lib/types/video'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface VideoActionsBarProps {
  video: VideoItem
  isLiked: boolean
  isLikeSubmitting: boolean
  isTipSubmitting: boolean
  showTipModal: boolean
  selectedTipAmount: number | null
  showShareMenu: boolean
  showMoreMenu: boolean
  onLike: () => void
  onToggleTipModal: () => void
  onSelectTipAmount: (amount: number) => void
  onConfirmTip: () => void
  onToggleShareMenu: () => void
  onToggleMoreMenu: () => void
}

const TIP_AMOUNTS = [5, 10, 20, 50, 100, 200]

export function VideoActionsBar({
  video,
  isLiked,
  isLikeSubmitting,
  isTipSubmitting,
  showTipModal,
  selectedTipAmount,
  showShareMenu,
  showMoreMenu,
  onLike,
  onToggleTipModal,
  onSelectTipAmount,
  onConfirmTip,
  onToggleShareMenu,
  onToggleMoreMenu
}: VideoActionsBarProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-[#0f0f12] border-t border-b border-white/10">
      <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4">
        <button
          onClick={onLike}
          disabled={isLikeSubmitting}
          className={cn(
            "flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all",
            "min-w-[110px]",
            isLiked
              ? "bg-red-500 text-white hover:bg-red-600 scale-105"
              : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          )}
        >
          <Heart className={cn("h-4 w-4 transition-all", isLiked && "fill-current scale-110")} />
          {t('like')}
        </button>

        <div className="relative">
          <button
            onClick={onToggleTipModal}
            disabled={isTipSubmitting}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-amber-500 text-white hover:bg-amber-600 transition-colors min-w-[110px]"
          >
            <Coins className="h-5 w-5" />
            {t('tip')}
          </button>

          {showTipModal && (
            <div className="absolute top-full left-0 mt-2 bg-[#141414] border border-white/10 rounded-xl shadow-2xl p-4 w-64 z-[100]">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-sm">{t('sendTip')}</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {TIP_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => onSelectTipAmount(amount)}
                    className={cn(
                      "px-2 py-1.5 rounded-lg font-semibold text-xs transition-colors",
                      selectedTipAmount === amount
                        ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-400/40"
                        : "bg-muted hover:bg-amber-500/20 hover:text-amber-500"
                    )}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onToggleTipModal}
                  className="flex-1 px-2 py-2 rounded-lg bg-muted hover:bg-muted/80 font-medium text-xs"
                >
                  {t('cancel')}
                </button>
                <button
                  disabled={selectedTipAmount == null}
                  onClick={onConfirmTip}
                  className={cn(
                    "flex-1 px-2 py-2 rounded-lg font-medium text-xs",
                    selectedTipAmount == null
                      ? "bg-amber-500/40 text-white/70 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  )}
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={onToggleShareMenu}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-blue-500 text-white hover:bg-blue-600 transition-colors min-w-[110px]"
          >
            <Share2 className="h-4 w-4" />
            {t('share')}
          </button>

          {showShareMenu && (
            <div className="absolute top-full left-0 mt-2 bg-[#141414] border border-white/10 rounded-xl shadow-2xl p-2 flex gap-2 z-20">
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-500/10 transition-colors"
                title="Facebook"
              >
                <Facebook className="h-5 w-5 text-blue-600" />
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sky-500/10 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5 text-sky-500" />
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-500/10 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-blue-700" />
              </button>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
                title={t('copyLink')}
              >
                <Link2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <a
          href={`/studio/index.html?remix=${encodeURIComponent(video.title)}&sourceId=${video.id}`}
          target="_blank"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors min-w-[110px]"
        >
          <Repeat2 className="h-4 w-4" />
          {t('remix')}
        </a>

        <div className="relative">
          <button
            onClick={onToggleMoreMenu}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-white/5 text-white hover:bg-white/10 transition-colors min-w-[110px]"
          >
            <MoreHorizontal className="h-4 w-4" />
            {t('more')}
          </button>

          {showMoreMenu && (
            <div className="absolute top-full left-0 mt-2 bg-[#141414] border border-white/10 rounded-lg shadow-lg overflow-hidden z-20 min-w-[160px]">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-red-500">
                <Flag className="h-4 w-4" />
                {t('report')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
