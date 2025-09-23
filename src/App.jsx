import './App.css'


export default function App() {
  return (
    <div className="app-root">
      <header className="site-header">
        <div className="logo">FarmGuard</div>
        <nav className="top-nav" aria-label="Primary">
          <a href="#learn-more">Features</a>
          <a href="#get-started">Get started</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <header className="hero" role="banner">
        <div className="hero-content">
          <h1>FarmGuard — Practical biosecurity for pig & poultry farms</h1>
          <p className="lead">A mobile-first platform for small and remote farms: risk checks, training, compliance tracking, and real-time alerts — built for low-bandwidth environments.</p>

          <div className="hero-ctas">
            <a className="btn primary" href="#get-started">Request a demo</a>
            <a className="btn ghost" href="#learn-more">Explore features</a>
          </div>

          <p className="note">Trusted by community programs and local veterinarians — designed for on-farm practicality.</p>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          {/* simple, lightweight SVG illustration */}
          <svg width="360" height="220" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <rect x="0" y="0" width="360" height="220" rx="12" fill="url(#g)" />
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#F0FDFA" />
                <stop offset="1" stopColor="#E6FFF8" />
              </linearGradient>
            </defs>
            <g transform="translate(18,28)" fill="#0F766E">
              <rect x="0" y="64" width="120" height="56" rx="8" fill="#0F766E" opacity="0.08" />
              <path d="M10 64c0-10 8-18 18-18h52v18H10z" fill="#0F766E" opacity="0.12" />
              <circle cx="190" cy="82" r="22" fill="#0EA5A1" opacity="0.14" />
            </g>
            <g transform="translate(28,40)" fill="#065F54">
              <rect x="0" y="80" width="60" height="28" rx="4" />
              <rect x="80" y="72" width="90" height="36" rx="6" />
              <circle cx="250" cy="64" r="10" />
            </g>
          </svg>
        </div>
      </header>

      <main>
        <section className="features" id="learn-more" aria-labelledby="features-heading">
          <h2 id="features-heading">Key features</h2>
          <div className="grid">
            <Feature id="f1" title="Risk Assessment Tools" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v6" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 22c0-4 4-8 8-8s8 4 8 8" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
              Assess on-farm disease risk with quick, localised questionnaires and get clear prioritized actions.
            </Feature>

            <Feature id="f2" title="Interactive Training" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="#0F766E" strokeWidth="1.6"/><path d="M7 8h10" stroke="#0F766E" strokeWidth="1.6" strokeLinecap="round"/></svg>}>
              Short, illustrated lessons that demonstrate simple daily biosecurity routines for farm workers.
            </Feature>

            <Feature id="f3" title="Compliance & Reporting" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#0EA5A1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
              Digital checklists, timestamps and exportable reports to document inspections and compliance steps.
            </Feature>

            <Feature id="f4" title="Real-time Alerts" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v4" stroke="#047857" strokeWidth="1.6" strokeLinecap="round"/><path d="M6 10c0-3 3-5 6-5s6 2 6 5v5c0 2-1 4-6 4s-6-2-6-4v-5z" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
              Get alerts for nearby outbreaks and on-farm anomalies so you can act quickly and confidently.
            </Feature>

            <Feature id="f5" title="Mobile & Multilingual" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="6" y="2" width="12" height="20" rx="3" stroke="#0EA5A1" strokeWidth="1.6"/><path d="M9 7h6" stroke="#0EA5A1" strokeWidth="1.6" strokeLinecap="round"/></svg>}>
              Local language support with a lightweight, mobile-first UI that works well on slow connections.
            </Feature>

            <Feature id="f6" title="Offline-first" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3" stroke="#047857" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}>
              Core functionality works offline and syncs when a connection becomes available.
            </Feature>
          </div>

          <div className="multilingual">
            <strong>Also:</strong> printable checklists, simple dashboards, and local language help.
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="testimonial-section">
          <div className="testimonial-inner">
            <blockquote className="testimonial-quote">
              "FarmGuard has made it so much easier for our team to follow biosecurity routines. The checklists and alerts are practical and easy to use, even for those who aren't tech-savvy."
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true"></div>
              <div>
                <div className="testimonial-name">A. Sharma</div>
                <div className="testimonial-role">Farm Owner, Punjab</div>
              </div>
            </div>
          </div>
        </section>

        <section className="callout" id="get-started">
          <div className="callout-inner">
// ...existing code...
            <h2>Ready to protect your farm?</h2>
            <p className="muted">Sign up for a free pilot, or request a demo for your region.</p>
            <div className="cta-row">
              <a className="btn primary" href="#contact">Request a demo</a>
              <a className="btn" href="#">Download app (beta)</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <div>© {new Date().getFullYear()} FarmGuard — Built for farmers</div>
        <nav aria-label="Footer">
          <a href="#learn-more">Features</a>
          <a href="#get-started">Get started</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </div>
  )
}
