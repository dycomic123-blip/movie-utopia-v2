import { Mail, MapPin, Phone } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Vision Section */}
        <section id="vision" className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-gradient">
            Our Vision
          </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-foreground/90 leading-relaxed mb-4">
              At Movie Utopia, we envision a future where anyone can become a filmmaker.
              Our AI-powered platform democratizes video creation, making professional-quality
              content accessible to creators worldwide.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed mb-4">
              We believe in the power of storytelling to connect, inspire, and transform.
              By combining cutting-edge artificial intelligence with intuitive design,
              we're building tools that amplify human creativity rather than replace it.
            </p>
            <div className="glass rounded-xl p-8 my-8">
              <h2 className="text-2xl font-serif font-semibold mb-4">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed">
                To empower creators of all skill levels with AI-driven video tools that
                preserve artistic vision while eliminating technical barriers. We're committed
                to building a platform that respects user privacy, promotes ethical AI use,
                and fosters a vibrant creative community.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="glass rounded-lg p-3">
                  <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:hello@movieutopia.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    hello@movieutopia.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    San Francisco, CA<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass rounded-lg p-3">
                  <Phone className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Support</h3>
                  <p className="text-muted-foreground">
                    24/7 via in-app chat
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass rounded-xl p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-serif font-semibold mb-4">
                Join Our Community
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect with creators, share your work, and stay updated on new features.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors">
                  Join Discord
                </button>
                <button className="px-6 py-3 glass hover:bg-white/10 rounded-lg font-medium transition-colors">
                  Follow on Twitter
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
