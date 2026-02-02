'use client'

import { DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { VideoItem } from '@/lib/types/video'
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'

interface TipButtonProps {
  video: VideoItem
}

const TIP_AMOUNTS = [1, 5, 10] as const

export function TipButton({ video }: TipButtonProps) {
  const { credits, deductCredits } = useAppStore()

  const handleTip = (amount: number) => {
    if (credits < amount) {
      toast.error('Insufficient credits')
      return
    }

    deductCredits(amount)
    toast.success(`Tipped $${amount} to ${video.author.name}!`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <DollarSign className="h-4 w-4" />
          Tip
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 border-neutral-800 bg-[#141414]">
        <div className="space-y-3">
          <div>
            <h4 className="mb-1 text-sm font-medium">Tip {video.author.name}</h4>
            <p className="text-xs text-neutral-400">
              Your balance: ${credits}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TIP_AMOUNTS.map((amount) => (
              <Button
                key={amount}
                variant={credits >= amount ? 'default' : 'outline'}
                disabled={credits < amount}
                onClick={() => handleTip(amount)}
                className="h-16 flex-col gap-1"
              >
                <DollarSign className="h-4 w-4" />
                <span className="text-lg font-bold">{amount}</span>
              </Button>
            ))}
          </div>

          <p className="text-xs text-neutral-500">
            Tips support creators and help them make more amazing content!
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
