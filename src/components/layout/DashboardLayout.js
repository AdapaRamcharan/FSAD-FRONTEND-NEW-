import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCity } from '../../context/CityContext';
import {
  FiHome, FiMap, FiAlertTriangle, FiNavigation, FiMessageSquare,
  FiSettings, FiLogOut, FiMenu, FiX, FiBell, FiSearch,
  FiUser, FiBarChart2, FiUsers, FiGlobe, FiChevronDown
} from 'react-icons/fi';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const { selectedCity, cities, selectCity } = useCity();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const basePath = isAdmin ? '/admin' : '/user';

  const userLinks = [
    { path: `${basePath}/dashboard`, icon: <FiHome size={20} />, label: t('dashboard') },
    { path: `${basePath}/city`, icon: <FiMap size={20} />, label: t('cityInfo') },
    { path: `${basePath}/report`, icon: <FiAlertTriangle size={20} />, label: t('reportIssue') },
    { path: `${basePath}/find-near-me`, icon: <FiNavigation size={20} />, label: t('findNearMe') },
    { path: `${basePath}/feedback`, icon: <FiMessageSquare size={20} />, label: t('feedback') },
  ];

  const adminLinks = [
    { path: `${basePath}/dashboard`, icon: <FiHome size={20} />, label: t('dashboard') },
    { path: `${basePath}/analytics`, icon: <FiBarChart2 size={20} />, label: t('analytics') },
    { path: `${basePath}/manage-reports`, icon: <FiAlertTriangle size={20} />, label: t('manageReports') },
    { path: `${basePath}/users`, icon: <FiUsers size={20} />, label: t('users') },
    { path: `${basePath}/city`, icon: <FiMap size={20} />, label: t('cities') },
    { path: `${basePath}/feedback`, icon: <FiMessageSquare size={20} />, label: t('feedback') },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentCity = selectedCity || cities.find(c => c.id === user?.city) || cities[0];

  React.useEffect(() => {
    if (!selectedCity && user?.city) {
      selectCity(user.city);
    } else if (!selectedCity) {
      selectCity(cities[0].id);
    }
  }, []); // eslint-disable-line

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' }
  ];

  return (
    <div className={`dashboard-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand" onClick={() => navigate('/')}>
            <span className="logo-icon">🏙️</span>
            {sidebarOpen && <span className="logo-text">SmartCity</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {sidebarOpen && (
          <div className="sidebar-role-badge">
            {isAdmin ? '🛡️ Admin Portal' : '👤 Citizen Portal'}
          </div>
        )}

        {/* City Selector */}
        {sidebarOpen && (
          <div className="sidebar-city-selector">
            <button className="city-selector-btn" onClick={() => setCityDropdownOpen(!cityDropdownOpen)}>
              <div className="city-selector-info">
                <span className="city-selector-name">{currentCity?.name}</span>
                <span className="city-selector-state">{currentCity?.state}</span>
              </div>
              <FiChevronDown className={`city-chevron ${cityDropdownOpen ? 'open' : ''}`} />
            </button>
            {cityDropdownOpen && (
              <div className="city-dropdown">
                {cities.map(city => (
                  <button
                    key={city.id}
                    className={`city-dropdown-item ${currentCity?.id === city.id ? 'active' : ''}`}
                    onClick={() => { selectCity(city.id); setCityDropdownOpen(false); }}
                  >
                    <span>{city.name}</span>
                    <span className="city-dropdown-state">{city.state}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <nav className="sidebar-nav">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={link.label}
            >
              {link.icon}
              {sidebarOpen && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <FiLogOut size={20} />
            {sidebarOpen && <span>{t('logout')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu size={20} />
            </button>
            <div className="header-search">
              <FiSearch size={18} />
              <input type="text" placeholder={t('search')} />
            </div>
          </div>

          <div className="header-right">
            {/* Language Selector */}
            <div className="header-lang">
              <button className="header-icon-btn" onClick={() => setLangOpen(!langOpen)}>
                <FiGlobe size={18} />
              </button>
              {langOpen && (
                <div className="header-dropdown lang-drop">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                      onClick={() => { changeLanguage(lang.code); setLangOpen(false); }}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="header-icon-btn notification-btn">
              <FiBell size={18} />
              <span className="notification-dot" />
            </button>

            {/* Profile */}
            <div className="header-profile">
              <button className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
                <img src={user?.avatar} alt={user?.name} className="profile-avatar" />
                <div className="profile-info">
                  <span className="profile-name">{user?.name}</span>
                  <span className="profile-role">{isAdmin ? 'Administrator' : 'Citizen'}</span>
                </div>
                <FiChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="header-dropdown profile-drop">
                  <div className="dropdown-header">
                    <img src={user?.avatar} alt={user?.name} className="dropdown-avatar" />
                    <div>
                      <p className="dropdown-name">{user?.name}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item"><FiUser size={16} /> {t('profile')}</button>
                  <button className="dropdown-item"><FiSettings size={16} /> {t('settings')}</button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <FiLogOut size={16} /> {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
