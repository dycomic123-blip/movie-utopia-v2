'use client'

import { Check } from 'lucide-react'

interface StudioStepIndicatorProps {
  currentStep: 1 | 2 | 3
}

const STEPS = [
  { number: 1, label: 'Input' },
  { number: 2, label: 'Processing' },
  { number: 3, label: 'Editor' },
]

export function StudioStepIndicator({ currentStep }: StudioStepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((step, index) => (
        <div key={step.number} className="flex flex-1 items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                step.number < currentStep
                  ? 'border-violet-500 bg-violet-500 text-white'
                  : step.number === currentStep
                    ? 'border-violet-500 bg-transparent text-violet-500'
                    : 'border-neutral-700 bg-transparent text-neutral-700'
              }`}
            >
              {step.number < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                step.number <= currentStep ? 'text-white' : 'text-neutral-600'
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < STEPS.length - 1 && (
            <div className="mx-2 h-0.5 flex-1 bg-neutral-800">
              <div
                className={`h-full transition-all duration-500 ${
                  step.number < currentStep ? 'bg-violet-500' : 'bg-transparent'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
