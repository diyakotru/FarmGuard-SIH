import { useState } from 'react';
import './App.css';
import heroImg from './assets/hero-chickens.jpg';

// The main App component containing the entire landing page
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* Custom styles for elements that Tailwind doesn't easily cover, like the hero overlay and nav animation */
        .hero-banner {
            background-image: url('https://placehold.co/1920x1080/0A5359/white?text=Digital+Biosecurity');
            background-size: cover;
            background-position: center;
            position: relative;
            z-index: 1;
        }
        .hero-banner::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: -1;
        }

        .nav-toggle .bar {
            width: 100%;
            height: 2px;
            background-color: #333;
            transition: all 0.3s ease-in-out;
        }

        .nav-toggle.open .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .nav-toggle.open .bar:nth-child(2) {
            opacity: 0;
        }
        .nav-toggle.open .bar:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
      `}</style>
      <div className="bg-gray-50 font-sans antialiased text-gray-800">

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-xl font-bold text-teal-700">FarmGuard</div>
            <button
              className={`md:hidden flex flex-col gap-1 w-6 h-6 justify-center items-center ${menuOpen ? 'open' : ''}`}
              aria-controls="primary-navigation"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
            <nav id="primary-navigation" className={`top-nav absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${menuOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-4 opacity-0 invisible md:visible md:translate-y-0 md:opacity-100'}`} aria-label="Primary">
              <div className="flex flex-col md:flex-row items-center md:space-x-8 p-4 md:p-0">
                <a href="#core-features" className="py-2 text-gray-700 hover:text-teal-700 font-medium" onClick={() => setMenuOpen(false)}>Features</a>
                <a href="#how" className="py-2 text-gray-700 hover:text-teal-700 font-medium" onClick={() => setMenuOpen(false)}>How it works</a>
                <a href="#get-started" className="btn bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-full transition-colors" onClick={() => setMenuOpen(false)}>Get Started</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Banner */}
        <header className="hero-banner text-white text-center py-24 md:py-48" role="banner" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Digital Biosecurity for Safer Farms</h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-8">Protect poultry & livestock with simple tools, real-time alerts, and digital records.</p>
            <div className="flex justify-center space-x-4">
              <a className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-colors cta-pulse" href="#get-started">Start Protecting Your Farm</a>
            </div>
          </div>
        </header>
        
        <main>
          {/* Core Features */}
          <section id="core-features" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-12">What we offer to keep your farm safe and productive.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureItem icon="📝" title="Risk Assessment & Advice" description="Quick surveys with prioritized actions." />
                <FeatureItem icon="🚨" title="Real-Time Outbreak Alerts" description="Local and regional alerts to act fast." />
                <FeatureItem icon="✔️" title="Compliance & Training Tools" description="Digital checklists and short training modules." />
                <FeatureItem icon="📊" title="Data for Smarter Decisions" description="Simple dashboards and exportable reports." />
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how" className="bg-gray-100 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-12">A simple, three-step process to a safer farm.</p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
                <HowItWorksStep step="1" title="Assess your farm" />
                <HowItWorksStep step="2" title="Get guidance & alerts" />
                <HowItWorksStep step="3" title="Track compliance digitally" />
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Users Say</h2>
              <div className="testimonials-grid">
                <Testimonial quote="FarmGuard helped us standardize sanitation across 12 sites — disease incidents dropped by 40% in a year." name="Aisha Rahman" role="Veterinary Officer, AgroFarm" />
                <Testimonial quote="The real-time alerts are a game changer. We caught an early outbreak and isolated it fast." name="Samuel K." role="Farm Manager, PoultryCo" />
                <Testimonial quote="Keeping digital records saved us days of manual work each month and improved traceability." name="Marta L." role="Biosecurity Lead" />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section id="get-started" className="py-16 md:py-24 bg-teal-700 text-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the movement for safer farming.</h2>
              <p className="text-gray-200 max-w-3xl mx-auto mb-8">Ready to take control of your farm's biosecurity? Get started with FarmGuard today.</p>
              <a className="bg-white text-teal-700 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow" href="#">Start Now</a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <div className="text-lg font-semibold text-white">FarmGuard</div>
              <p className="text-sm mt-1">Digital Biosecurity for Safer Farms</p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </nav>
            <div className="text-sm">
              <p>hello@farmguard.example</p>
              <div className="flex justify-center md:justify-start space-x-4 mt-2">
                <a href="#" className="hover:text-white transition-colors">[FB]</a>
                <a href="#" className="hover:text-white transition-colors">[X]</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Sub-components
const FeatureItem = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorksStep = ({ step, title }) => (
  <div className="flex flex-col items-center max-w-xs text-center">
    <div className="w-12 h-12 flex items-center justify-center text-xl font-bold bg-teal-100 text-teal-700 rounded-full mb-4">{step}</div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
  </div>
);

const Testimonial = ({ quote, name, role }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
      </div>
    </div>
  </div>
);
