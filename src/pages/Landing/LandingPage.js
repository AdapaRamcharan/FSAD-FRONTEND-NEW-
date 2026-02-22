import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { cityData } from '../../data/cityData';
import Navbar from '../../components/shared/Navbar';
import { FiMapPin, FiShield, FiUsers, FiBarChart2, FiArrowRight, FiStar, FiGlobe, FiZap, FiMap, FiMessageSquare, FiChevronDown } from 'react-icons/fi';
import './LandingPage.css';

const LandingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeCityIndex, setActiveCityIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCityIndex(prev => (prev + 1) % cityData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <FiMap size={28} />, title: 'Interactive Maps', desc: 'Explore city amenities with real-time Google Maps integration showing hospitals, parks, police stations, and more.' },
    { icon: <FiShield size={28} />, title: 'Report Issues', desc: 'Report potholes, garbage, water leaks, or streetlight failures. Upload photos, tag locations, and track resolution.' },
    { icon: <FiBarChart2 size={28} />, title: 'Live Dashboard', desc: 'Real-time weather updates, air quality index, traffic insights, daily news, and smart city alerts.' },
    { icon: <FiUsers size={28} />, title: 'Citizen Engagement', desc: 'Rate amenities, provide feedback on services, and participate in making your city smarter.' },
    { icon: <FiGlobe size={28} />, title: 'Multi-language', desc: 'Access the platform in English, Hindi, and Telugu to ensure inclusivity across diverse populations.' },
    { icon: <FiZap size={28} />, title: 'Smart Alerts', desc: 'Receive instant notifications about emergencies, weather warnings, and city events.' }
  ];

  const stats = [
    { number: '4+', label: 'Major Cities' },
    { number: '50K+', label: 'Active Citizens' },
    { number: '10K+', label: 'Issues Resolved' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="landing-page">
      <Navbar transparent={!scrolled} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }} />
            ))}
          </div>
          <div className="hero-gradient-orb hero-orb-1" />
          <div className="hero-gradient-orb hero-orb-2" />
          <div className="hero-gradient-orb hero-orb-3" />
        </div>

        <div className="hero-content container">
          <div className="hero-text">
            <div className="hero-badge">
              <FiZap size={14} /> Next-Gen Urban Platform
            </div>
            <h1 className="hero-title">
              {t('welcome')}
              <span className="hero-title-gradient"> Management Platform</span>
            </h1>
            <p className="hero-subtitle">{t('tagline')}</p>
            <p className="hero-description">
              Centralizing public services, infrastructure data, and citizen engagement 
              into a single intelligent system for Hyderabad, Chennai, Mumbai & Delhi.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('cities').scrollIntoView({ behavior: 'smooth' })}>
                {t('explore')} <FiArrowRight />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/signin')}>
                Get Started <FiArrowRight />
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-number">{stat.number}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-city-showcase">
              {cityData.map((city, i) => (
                <div
                  key={city.id}
                  className={`hero-city-card ${i === activeCityIndex ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${city.heroImage})` }}
                >
                  <div className="hero-city-overlay">
                    <h3>{city.name}</h3>
                    <p>{city.tagline}</p>
                  </div>
                </div>
              ))}
              <div className="hero-city-indicators">
                {cityData.map((_, i) => (
                  <button
                    key={i}
                    className={`indicator ${i === activeCityIndex ? 'active' : ''}`}
                    onClick={() => setActiveCityIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => document.getElementById('cities').scrollIntoView({ behavior: 'smooth' })}>
          <FiChevronDown size={24} />
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="cities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Explore</span>
            <h2 className="section-title">Discover Smart Cities</h2>
            <p className="section-subtitle">Navigate through India's major cities and access essential information at your fingertips</p>
          </div>

          <div className="cities-grid">
            {cityData.map((city, index) => (
              <div
                key={city.id}
                className="city-card"
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => navigate('/signin')}
              >
                <div className="city-card-image" style={{ backgroundImage: `url(${city.heroImage})` }}>
                  <div className="city-card-gradient" style={{ background: city.coverGradient }} />
                  <div className="city-card-badge">
                    <FiMapPin size={14} /> {city.state}
                  </div>
                </div>
                <div className="city-card-content">
                  <h3 className="city-card-name">{city.name}</h3>
                  <p className="city-card-tagline">{city.tagline}</p>
                  <p className="city-card-desc">{city.description.substring(0, 120)}...</p>
                  <div className="city-card-stats">
                    <div className="city-stat">
                      <span className="city-stat-icon">👥</span>
                      <span>{city.population}</span>
                    </div>
                    <div className="city-stat">
                      <span className="city-stat-icon">🌡️</span>
                      <span>{city.weather.temp}°C</span>
                    </div>
                    <div className="city-stat">
                      <span className="city-stat-icon">💨</span>
                      <span>AQI {city.aqi.value}</span>
                    </div>
                  </div>
                  <button className="city-card-btn">
                    Explore {city.name} <FiArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2 className="section-title">Powerful Platform Features</h2>
            <p className="section-subtitle">Everything you need to navigate, report, and engage with your city</p>
          </div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / How it works */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How It Works</span>
            <h2 className="section-title">Your Smart City Journey</h2>
          </div>
          <div className="steps-grid">
            {[
              { step: '01', title: 'Explore Cities', desc: 'Browse through Hyderabad, Chennai, Mumbai, and Delhi to discover essential city information.', icon: '🏙️' },
              { step: '02', title: 'Sign Up / Sign In', desc: 'Create your account as a Citizen or Admin to access personalized features and dashboards.', icon: '🔐' },
              { step: '03', title: 'Access Dashboard', desc: 'Get real-time weather, news, AQI, traffic updates, and explore city amenities on interactive maps.', icon: '📊' },
              { step: '04', title: 'Engage & Report', desc: 'Report civic issues, provide feedback, find nearby services, and help improve your city.', icon: '🤝' }
            ].map((item, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{item.step}</div>
                <div className="step-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Smart City Living?</h2>
            <p>Join thousands of citizens making their cities smarter, safer, and more connected.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/signup')}>
                Create Free Account <FiArrowRight />
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/signin')}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="navbar-logo">
                <span className="logo-icon">🏙️</span>
                <span className="logo-text">SmartCity</span>
              </div>
              <p>Transforming urban living through digital innovation and citizen engagement.</p>
            </div>
            <div className="footer-column">
              <h4>Cities</h4>
              <a href="#cities">Hyderabad</a>
              <a href="#cities">Chennai</a>
              <a href="#cities">Mumbai</a>
              <a href="#cities">Delhi</a>
            </div>
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#features">Features</a>
              <a href="#about">How it Works</a>
              <a href="#features">Report Issues</a>
              <a href="#features">Find Near Me</a>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <a href="mailto:info@smartcity.com">info@smartcity.com</a>
              <a href="tel:1800-SMART">1800-SMART</a>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Available 24/7</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 SmartCity Management Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
