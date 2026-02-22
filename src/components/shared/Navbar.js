import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiGlobe, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ transparent }) => {
  const { user, isAuthenticated } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <nav className={`navbar ${transparent ? 'navbar-transparent' : 'navbar-solid'}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <div className="navbar-logo">
            <span className="logo-icon">🏙️</span>
            <span className="logo-text">SmartCity</span>
          </div>
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="#cities" className="nav-link" onClick={() => setMenuOpen(false)}>Cities</a>
          <a href="#features" className="nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a>

          <div className="lang-selector">
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
              <FiGlobe size={18} />
              <span>{languages.find(l => l.code === language)?.flag}</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`lang-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}
                  >
                    <span>{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <button className="btn btn-primary nav-btn" onClick={() => navigate(user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard')}>
              Go to Dashboard <FiArrowRight size={16} />
            </button>
          ) : (
            <>
              <button className="btn btn-outline nav-btn" onClick={() => navigate('/signin')}>
                {t('signin')}
              </button>
              <button className="btn btn-primary nav-btn" onClick={() => navigate('/signup')}>
                {t('signup')}
              </button>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
