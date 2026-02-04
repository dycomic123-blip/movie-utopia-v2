'use client'

import { Clapperboard, Users, Sparkles, Target, Award, Globe, ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      {/* Compact Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Compact Brand */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold mb-4 uppercase tracking-tight leading-none">
                <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  MOVIE UTOPIA
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light mb-8">
                Building the state-of-the-art cinematic video generation model
              </p>

              {/* Core Info - Highlighted */}
              <div className="glass-premium rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  We specialize in <span className="text-amber-500 font-semibold">industrial-grade AI filmmaking</span>,
                  delivering end-to-end solutions for <span className="text-amber-500 font-semibold">production</span>,
                  <span className="text-amber-500 font-semibold"> distribution</span>, and
                  <span className="text-amber-500 font-semibold"> ecosystem</span> building.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Core Pillars - Above the fold */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Three Pillars - Compact Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Production */}
              <div className="glass-premium rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Clapperboard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Production</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Cutting-edge AI models transforming ideas into cinema-quality video. Streamlined workflow from concept to final cut.
                </p>
              </div>

              {/* Distribution */}
              <div className="glass-premium rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Distribution</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Seamless platforms for sharing, monetizing, and growing audiences worldwide through intelligent content delivery.
                </p>
              </div>

              {/* Ecosystem */}
              <div className="glass-premium rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Ecosystem</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Vibrant community where creators collaborate, compete, and thrive through challenges and bounties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Vision & Values in Two Columns */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-black/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision - Left */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Vision</h2>
                </div>
                <p className="text-base text-foreground/80 leading-relaxed">
                  To revolutionize filmmaking by making industrial-grade AI tools accessible to every creator,
                  from independent artists to major studios. We envision technology amplifying human creativity,
                  enabling storytellers to bring their most ambitious visions to life.
                </p>
              </div>

              {/* Values - Right */}
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4">Core Values</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-violet-500 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Innovation</h4>
                    </div>
                    <p className="text-xs text-foreground/70">Pushing boundaries in AI cinema</p>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Community</h4>
                    </div>
                    <p className="text-xs text-foreground/70">Built by creator feedback</p>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Excellence</h4>
                    </div>
                    <p className="text-xs text-foreground/70">Cinema-grade standards</p>
                  </div>

                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <h4 className="font-semibold text-sm">Global</h4>
                    </div>
                    <p className="text-xs text-foreground/70">Empowering worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Leadership */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Leadership Team</h2>
              <p className="text-muted-foreground">Visionaries driving AI cinema forward</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { role: 'Co-founder & CEO', name: 'Leadership Position' },
                { role: 'Co-founder & CTO', name: 'Leadership Position' },
                { role: 'Head of Research', name: 'Leadership Position' }
              ].map((member, index) => (
                <div
                  key={index}
                  className="glass-premium rounded-xl p-6 text-center hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-amber-500 text-sm font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-premium rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Join the Revolution
              </h2>
              <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
                Be part of the community shaping the future of AI filmmaking.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20">
                  Start Creating
                </button>
                <a
                  href="mailto:contact@movieutopia.com"
                  className="px-6 py-3 glass hover:bg-white/10 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <section className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Questions or partnerships?
            </p>
            <a
              href="mailto:contact@movieutopia.com"
              className="text-lg text-amber-500 hover:text-amber-400 transition-colors font-medium"
            >
              contact@movieutopia.com
            </a>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
