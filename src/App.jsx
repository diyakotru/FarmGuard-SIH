import './App.css'

function App() {
  return (
    <div className="app-root" lang="en">
      <header className="hero">
        <div className="hero-content">
          <h1>FarmGuard — Simple biosecurity for pig & poultry farms</h1>
          <p className="lead">A simple, mobile-friendly platform to keep your animals safe from disease — risk checks, training, compliance tracking, and real-time alerts.</p>
          <div className="hero-ctas">
            <a className="btn primary" href="#risk">Start Risk Check</a>
            <a className="btn" href="#learn">See Training</a>
          </div>
          <p className="note">Designed for small and remote farms. Multilingual & easy to use on any phone.</p>
        </div>
        <div className="hero-illustration" aria-hidden="true">
          {/* simple decorative illustration placeholder */}
          <div className="farm-illustration">🐖🐔⚕️</div>
        </div>
      </header>

      <main>
        <section id="features" className="features">
          <h2>What the platform provides</h2>
          <div className="grid">
            <article id="risk" className="feature">
              <h3>Risk Assessment Tools</h3>
              <p>Quick farm risk checks based on local outbreak data and farm practices — get a simple score and recommended actions.</p>
              <a className="link-btn" href="#">Try risk tool</a>
            </article>

            <article id="learn" className="feature">
              <h3>Interactive Training & Guidelines</h3>
              <p>Short, step-by-step lessons with images and checklists that show exactly what to do to reduce disease risk.</p>
              <a className="link-btn" href="#">Open training</a>
            </article>

            <article id="compliance" className="feature">
              <h3>Compliance Tracking</h3>
              <p>Track your farm's compliance with government rules and see what to improve to reach disease-free status.</p>
              <a className="link-btn" href="#">View tracker</a>
            </article>

            <article id="alerts" className="feature">
              <h3>Real-Time Alerts & Monitoring</h3>
              <p>Instant warnings for nearby outbreaks, and notifications if something on your farm needs attention.</p>
              <a className="link-btn" href="#">Enable alerts</a>
            </article>
          </div>
        </section>

        <section id="collab" className="collab">
          <h2>Collaboration & Data</h2>
          <p>Share selected farm health records with vets and government teams to speed up responses and shape better policy.</p>
          <ul>
            <li>Farm health logs</li>
            <li>Outbreak maps</li>
            <li>Secure, permissioned sharing</li>
          </ul>
        </section>

        <section id="multilingual" className="multilingual">
          <h2>Multilingual & Mobile-First</h2>
          <p>The interface supports local languages and is optimised for small screens so anyone can use it in the field.</p>
        </section>

        <section id="sustain" className="sustain">
          <h2>Sustainable Farming</h2>
          <p>Long-term recommendations and best practices so farms stay healthy and productive over time.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <p>Built to help farmers, vets, and governments work together — FarmGuard © {new Date().getFullYear()}</p>
        </div>
        <nav aria-label="footer">
          <a href="#features">Features</a>
          <a href="#risk">Risk Check</a>
          <a href="#learn">Training</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
