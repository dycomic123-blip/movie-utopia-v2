'use client'

import { useState, useEffect } from 'react'

export function AccessKeyModal() {
    const [isVisible, setIsVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isShake, setIsShake] = useState(false)
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [isWarping, setIsWarping] = useState(false)
    const [dots, setDots] = useState([false, false, false, false, false, false])

    // Use session storage for transient access
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hasAccess = sessionStorage.getItem('utopia_access_v2')
            if (!hasAccess) {
                setIsVisible(true)
            }
        }
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (val.length > 6) return

        setInputValue(val)

        // Update dots
        const newDots = dots.map((_, index) => index < val.length)
        setDots(newDots)

        // Auto-submit on 6 chars
        if (val.length === 6) {
            setTimeout(() => handleSubmit(val), 300)
        }
    }

    const handleSubmit = (val = inputValue) => {
        if (val === 'szy888') {
            // Success Logic: Mechanical Unlock & Warp Transition
            sessionStorage.setItem('utopia_access_v2', 'true')
            setIsUnlocked(true)

            // Delay for lock animation then warp
            setTimeout(() => {
                setIsWarping(true)
                // Delay for Warp out + hide
                setTimeout(() => {
                    setIsVisible(false)
                }, 1200)
            }, 600)
        } else {
            // Error
            setIsShake(true)
            setInputValue('')
            setDots(dots.map(() => false))

            setTimeout(() => setIsShake(false), 600)
        }
    }

    if (!isVisible) return null

    return (
        <div id="login-modal" className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${!isVisible ? 'hidden' : ''}`}>
            {/* Backdrop - consistent 70% opacity as requested */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>

            {/* Modal Content - Exact structure from Studio */}
            <div
                className={`glass-premium w-full max-w-md pt-16 pb-12 px-12 rounded-[2.5rem] relative transform transition-all duration-500 
          ${isWarping ? 'app-warp' : 'scale-100 opacity-100'} 
          ${isShake ? 'animate-shake' : ''}`}
                id="login-modal-content"
            >
                {/* Close Button - kept but visually cleaner */}
                <button
                    onClick={() => { }}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-all"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Logo & Title Section */}
                <div className="text-center mb-14">
                    <div className="mb-10 group-hover:scale-105 transition-transform duration-1000">
                        <img src="studio/logo.png" alt="Logo" className="h-9 w-auto mx-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.06)]" />
                    </div>
                    <h3 className="flex flex-nowrap items-center justify-center gap-x-2.5 text-center px-4 whitespace-nowrap">
                        <span style={{ fontFamily: 'var(--font-sans)' }} className="text-zinc-500 font-medium text-xl tracking-tight">Welcome to</span>
                        <span style={{ fontFamily: 'var(--font-serif)' }} className="text-xl font-normal text-white tracking-[0.15em] uppercase bg-gradient-to-br from-white via-orange-100 to-orange-300 bg-clip-text text-transparent drop-shadow-sm">
                            MOVIE UTOPIA
                        </span>
                    </h3>
                </div>

                {/* Unified Form */}
                <div id="login-form-container" className="space-y-4">
                    {/* Integrated Access Key Design */}
                    <div className="relative group mb-8" id="key-component-container">
                        <div className="btn-shine flex items-center bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl py-2.5 pl-6 gap-4 hover:from-orange-500 hover:to-orange-400 hover:shadow-[0_0_40px_rgba(255,107,53,0.35)] transition-all duration-700 shadow-lg shadow-orange-600/20 overflow-hidden relative">
                            <span className="shine-layer opacity-20"></span>
                            <div className="energy-line"></div>

                            {/* Left: Label - Reverted to original centered style */}
                            <span className="relative z-10 text-[13px] font-black text-white/90 tracking-[0.3em] uppercase whitespace-nowrap">
                                ACCESS KEY
                            </span>

                            {/* Middle: Inset Dot Indicator Area - Reverted to original size */}
                            <div className="flex-1 relative z-10 h-12">
                                <div className="absolute inset-0 bg-black/60 rounded-xl shadow-[inset_0_2px_12px_rgba(0,0,0,0.9)] border border-white/5 pointer-events-none"></div>
                                <div className="absolute inset-0 flex items-center justify-center gap-2.5 px-3 pointer-events-none" id="key-dots-container">
                                    {dots.map((active, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${active ? 'bg-white shadow-[0_0_10px_#fff] border-white' : 'bg-orange-950/50 border border-orange-500/10'} ${isShake && active ? '!bg-red-500 !shadow-[0_0_15px_#ef4444] !border-red-500' : ''}`}></div>
                                    ))}
                                </div>

                                <input
                                    type="password"
                                    id="login-access-key"
                                    maxLength={6}
                                    className="absolute inset-0 w-full opacity-0 cursor-text z-20 focus:outline-none"
                                    value={inputValue}
                                    onChange={handleInput}
                                    autoFocus
                                />
                            </div>

                            {/* Right: Master Unlocked Trigger */}
                            <button onClick={() => handleSubmit()} id="btn-master-unlock" className={`relative z-30 pr-3 pl-1 text-white hover:text-white transition-all duration-300 transform active:scale-95 group/key-icon ${isUnlocked ? 'lock-unlocked' : ''}`}>
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover/key-icon:opacity-100 transition-opacity"></div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 lock-icon" style={{ overflow: 'visible' }}>
                                    <path d="M7 11V7a5 5 0 0 1 9.9-1" className="lock-shackle" />
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M12 16v3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        onClick={() => handleSubmit()}
                        id="btn-login-submit"
                        className={`group relative w-full py-4 bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] text-zinc-500 hover:text-white font-bold rounded-xl transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden ${isShake ? 'animate-shake' : ''}`}
                    >
                        <span className="btn-text relative z-10">Sign In</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1.5 duration-500">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                {/* Divider & Social Logins */}
                <div id="social-login-section" className="mt-12 space-y-8 animate-enter delay-300">
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold tracking-widest uppercase"><span className="bg-[#0d0d0d] px-4 text-zinc-700">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-500 group-hover:text-white transition-colors">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-white">Facebook</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3.5 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/5 transition-all group">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-500 group-hover:text-white transition-colors">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 8.213-3.307 2.253-2.253 2.947-6.08 2.947-9.053 0-.627-.053-1.227-.16-1.813h-11.04z" />
                            </svg>
                            <span className="text-xs font-bold text-zinc-500 group-hover:text-white">Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
