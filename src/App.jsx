import './App.css'

function App() {
  return (
    <div className="app-root">
      <header className="hero" role="banner">
        <div className="hero-content">
          <h1>FarmShield — Simple biosecurity for pig & poultry farmers</h1>
          <p className="lead">An easy-to-use digital platform that helps small and remote farmers keep their pigs and poultry safe from diseases. Risk checks, training, compliance tracking, real-time alerts, and mobile-first multilingual support.</p>

          <div className="hero-ctas">
            <a className="btn primary" href="#get-started">Get started</a>
            <a className="btn" href="#learn-more">Learn more</a>
            <a className="btn" href="#contact">Contact us</a>
          </div>

          <p className="note">Trusted tools for on-farm risk assessment, training, and compliance — designed for low-bandwidth and mobile use.</p>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <div className="farm-illustration">🐖🐔</div>
        </div>
      </header>

      <main>
        <section className="features" id="learn-more" aria-labelledby="features-heading">
          <h2 id="features-heading">Key features</h2>

          <div className="grid">
            <article className="feature" aria-labelledby="f1">
              <h3 id="f1">Risk Assessment Tools</h3>
              <p>Assess your farm's disease risk using local data and simple questionnaires. Get prioritized actions to lower risk.</p>
              <a className="link-btn" href="#">Try the risk checker →</a>
            </article>

            <article className="feature" aria-labelledby="f2">
              <h3 id="f2">Interactive Training & Guidelines</h3>
              <p>Step-by-step lessons with illustrations and short videos that show exact biosecurity steps for daily routines.</p>
              <a className="link-btn" href="#">Start training →</a>
            </article>

            <article className="feature" aria-labelledby="f3">
              <h3 id="f3">Compliance Tracking</h3>
              <p>Keep records of your inspections and actions. Generate reports to demonstrate compliance with local regulations.</p>
              <a className="link-btn" href="#">View compliance tools →</a>
            </article>

            <article className="feature" aria-labelledby="f4">
              <h3 id="f4">Real-Time Alerts & Monitoring</h3>
              <p>Receive instant alerts about nearby outbreaks and on-farm anomalies so you can act quickly.</p>
              <a className="link-btn" href="#">Set up alerts →</a>
            </article>

            <article className="feature" aria-labelledby="f5">
              <h3 id="f5">Multilingual & Mobile-Friendly</h3>
              <p>Available in local languages with a clear, mobile-first UI for farmers with limited connectivity.</p>
              <a className="link-btn" href="#">Language options →</a>
            </article>

            <article className="feature" aria-labelledby="f6">
              <h3 id="f6">Offline & Lightweight</h3>
              <p>Designed to work offline for core functionality and sync when a connection is available.</p>
              <a className="link-btn" href="#">Learn about offline mode →</a>
            </article>
          </div>

          <div className="multilingual">
            <strong>Also:</strong> simple dashboards, printable checklists, local language help, and step-by-step emergency actions.
          </div>
        </section>

        <section className="callout" id="get-started">
          <div className="callout-inner">
            <h2>Ready to protect your farm?</h2>
            <p className="muted">Sign up for a free pilot, or request a demo for your region.</p>
            <div style={{marginTop:12}}>
              <a className="btn primary" href="#contact">Request a demo</a>
              <a className="btn" href="#">Download app (beta)</a>
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer" role="contentinfo">
        <div>© {new Date().getFullYear()} FarmShield — Built for farmers</div>
        <nav aria-label="Footer">
          <a href="#learn-more">Features</a>
          <a href="#get-started">Get started</a>
          <a href="#contact">Contact</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
