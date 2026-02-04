import { Clapperboard, Users, Sparkles, Target, Award, Globe } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo & Brand */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold mb-6 uppercase tracking-tight">
                <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  MOVIE UTOPIA
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 font-light tracking-wide">
                Building the state-of-the-art cinematic video generation model
              </p>
            </div>

            {/* Mission Statement */}
            <div className="glass-premium rounded-2xl p-8 md:p-12 mt-12">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                We specialize in <span className="text-amber-500 font-semibold">industrial-grade AI filmmaking</span>,
                crafting innovative solutions for <span className="text-amber-500 font-semibold">production, distribution</span>,
                and building a thriving <span className="text-amber-500 font-semibold">creator ecosystem</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Our Core Pillars
              </h2>
              <p className="text-xl text-muted-foreground">
                Three foundations that power the future of cinematic AI
              </p>
            </div>

            {/* Three Pillars Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Production */}
              <div className="glass-premium rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6">
                  <Clapperboard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Production</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Cutting-edge AI models that transform ideas into cinema-quality video content.
                  From concept to final cut, our technology streamlines the entire creative workflow.
                </p>
              </div>

              {/* Distribution */}
              <div className="glass-premium rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Distribution</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Seamless platforms to share, monetize, and grow your audience.
                  We connect creators with viewers worldwide through intelligent content delivery.
                </p>
              </div>

              {/* Ecosystem */}
              <div className="glass-premium rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">Ecosystem</h3>
                <p className="text-foreground/70 leading-relaxed">
                  A vibrant community where creators collaborate, compete, and thrive.
                  From challenges to bounties, we foster innovation and connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Vision */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold">Our Vision</h2>
              </div>
              <p className="text-xl text-foreground/80 leading-relaxed mb-6">
                To revolutionize filmmaking by making industrial-grade AI tools accessible to every creator,
                from independent artists to major studios. We envision a future where technology amplifies
                human creativity, enabling storytellers to bring their most ambitious visions to life.
              </p>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-violet-500" />
                  <h3 className="text-xl font-semibold">Innovation First</h3>
                </div>
                <p className="text-foreground/70">
                  Pushing the boundaries of what's possible in AI-generated cinema.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-cyan-500" />
                  <h3 className="text-xl font-semibold">Community Driven</h3>
                </div>
                <p className="text-foreground/70">
                  Building tools shaped by the needs and feedback of our creators.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-amber-500" />
                  <h3 className="text-xl font-semibold">Quality Excellence</h3>
                </div>
                <p className="text-foreground/70">
                  Delivering cinema-grade results that meet professional standards.
                </p>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold">Global Reach</h3>
                </div>
                <p className="text-foreground/70">
                  Empowering creators worldwide to share their stories across borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Leadership Team
              </h2>
              <p className="text-xl text-muted-foreground">
                Visionaries driving the future of AI cinema
              </p>
            </div>

            {/* Team Grid - Placeholder for now */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { role: 'Co-founder & CEO', name: 'Leadership Position' },
                { role: 'Co-founder & CTO', name: 'Leadership Position' },
                { role: 'Head of Research', name: 'Leadership Position' }
              ].map((member, index) => (
                <div
                  key={index}
                  className="glass-premium rounded-2xl p-8 text-center hover:scale-105 transition-transform duration-300"
                >
                  {/* Avatar Placeholder */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-amber-500 font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-premium rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Join the Revolution
              </h2>
              <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                Be part of the community shaping the future of AI filmmaking.
                From creators to studios, everyone has a place in Movie Utopia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20">
                  Start Creating
                </button>
                <a
                  href="mailto:contact@movieutopia.com"
                  className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              Questions or partnerships? Reach out to us at
            </p>
            <a
              href="mailto:contact@movieutopia.com"
              className="text-xl text-amber-500 hover:text-amber-400 transition-colors font-medium"
            >
              contact@movieutopia.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
