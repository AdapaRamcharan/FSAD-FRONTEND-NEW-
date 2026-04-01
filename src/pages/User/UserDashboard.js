import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiSun, FiWind, FiDroplet, FiAlertTriangle, FiMapPin, FiPhone, FiClock, FiTrendingUp, FiNavigation, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const { selectedCity, issues } = useCity();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const city = selectedCity;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!city) return <div className="loading-state">Loading city data...</div>;

  const userIssues = issues.filter(i => i.city === city.id);
  const pendingCount = userIssues.filter(i => i.status === 'pending').length;
  const resolvedCount = userIssues.filter(i => i.status === 'resolved').length;

  const getWeatherIcon = (condition) => {
    if (condition?.toLowerCase().includes('sunny') || condition?.toLowerCase().includes('clear')) return '☀️';
    if (condition?.toLowerCase().includes('cloud')) return '⛅';
    if (condition?.toLowerCase().includes('rain')) return '🌧️';
    if (condition?.toLowerCase().includes('humid')) return '💧';
    return '🌤️';
  };

  const getAqiColor = (value) => {
    if (value <= 50) return '#10b981';
    if (value <= 100) return '#f59e0b';
    if (value <= 150) return '#f97316';
    return '#ef4444';
  };

  const getTrafficColor = (status) => {
    if (status === 'light') return '#10b981';
    if (status === 'moderate') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="user-dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner" style={{ background: city.coverGradient }}>
        <div className="welcome-content">
          <div className="welcome-text">
            <p className="welcome-greeting">Welcome back,</p>
            <h1 className="welcome-name">{user?.name}! 👋</h1>
            <p className="welcome-city">
              <FiMapPin size={16} /> {city.name}, {city.state}
            </p>
          </div>
          <div className="welcome-time">
            <div className="time-display">
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="date-display">
              {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
            <FiAlertTriangle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{userIssues.length}</span>
            <span className="stat-label">Total Issues</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
            <FiClock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
            <FiTrendingUp size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{resolvedCount}</span>
            <span className="stat-label">Resolved</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(14,165,233,0.1)', color: '#0ea5e9' }}>
            <FiNavigation size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{Object.values(city.amenities).flat().length}</span>
            <span className="stat-label">Nearby Amenities</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Weather Card */}
        <div className="dash-card weather-card">
          <div className="card-header">
            <h3><FiSun size={18} /> {t('weather')}</h3>
            <span className="card-badge">{city.name}</span>
          </div>
          <div className="weather-content">
            <div className="weather-main">
              <span className="weather-icon">{getWeatherIcon(city.weather.condition)}</span>
              <div className="weather-temp">
                <span className="temp-value">{city.weather.temp}°</span>
                <span className="temp-unit">C</span>
              </div>
            </div>
            <p className="weather-condition">{city.weather.condition}</p>
            <div className="weather-details">
              <div className="weather-detail">
                <FiDroplet size={16} />
                <span>Humidity</span>
                <strong>{city.weather.humidity}%</strong>
              </div>
              <div className="weather-detail">
                <FiWind size={16} />
                <span>Wind</span>
                <strong>{city.weather.wind} km/h</strong>
              </div>
            </div>
          </div>
        </div>

        {/* AQI Card */}
        <div className="dash-card aqi-card">
          <div className="card-header">
            <h3>🌿 {t('airQuality')}</h3>
          </div>
          <div className="aqi-content">
            <div className="aqi-gauge" style={{ borderColor: getAqiColor(city.aqi.value) }}>
              <span className="aqi-value" style={{ color: getAqiColor(city.aqi.value) }}>{city.aqi.value}</span>
              <span className="aqi-label">AQI</span>
            </div>
            <div className="aqi-info">
              <span className="aqi-level" style={{ color: getAqiColor(city.aqi.value) }}>{city.aqi.level}</span>
              <div className="aqi-scale">
                <div className="aqi-bar">
                  <div className="aqi-fill" style={{ width: `${Math.min(city.aqi.value / 3, 100)}%`, background: getAqiColor(city.aqi.value) }} />
                </div>
                <div className="aqi-labels">
                  <span>Good</span>
                  <span>Moderate</span>
                  <span>Poor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Card */}
        <div className="dash-card traffic-card">
          <div className="card-header">
            <h3>🚦 {t('traffic')}</h3>
          </div>
          <div className="traffic-list">
            {city.trafficInfo.map((item, i) => (
              <div key={i} className="traffic-item">
                <div className="traffic-dot" style={{ background: getTrafficColor(item.status) }} />
                <div className="traffic-info">
                  <span className="traffic-road">{item.road}</span>
                  <span className="traffic-status" style={{ color: getTrafficColor(item.status) }}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)} • {item.delay}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Card */}
        <div className="dash-card news-card">
          <div className="card-header">
            <h3>📰 {t('news')}</h3>
            <span className="card-badge live-badge">LIVE</span>
          </div>
          <div className="news-list">
            {city.news.map((item, i) => (
              <div key={i} className="news-item">
                <div className="news-category">{item.category}</div>
                <h4 className="news-title">{item.title}</h4>
                <span className="news-time"><FiClock size={12} /> {item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="dash-card emergency-card">
          <div className="card-header">
            <h3>🚨 {t('emergency')}</h3>
          </div>
          <div className="emergency-list">
            {city.emergencyContacts.map((contact, i) => (
              <div key={i} className="emergency-item">
                <span className="emergency-icon">{contact.icon}</span>
                <div className="emergency-info">
                  <span className="emergency-name">{contact.name}</span>
                  <a href={`tel:${contact.number}`} className="emergency-number">
                    <FiPhone size={12} /> {contact.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Map Preview */}
        <div className="dash-card map-card">
          <div className="card-header">
            <h3>🗺️ City Map</h3>
            <button className="card-link" onClick={() => navigate('/user/find-near-me')}>
              Open Full Map <FiExternalLink size={14} />
            </button>
          </div>
          <div className="map-preview">
            <iframe
              title="City Map"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${city.coordinates.lat},${city.coordinates.lng}&zoom=12&maptype=roadmap`}
              allowFullScreen
            />
          </div>
        </div>

        {/* Famous Places */}
        <div className="dash-card places-card">
          <div className="card-header">
            <h3>⭐ {t('famousPlaces')}</h3>
            <button className="card-link" onClick={() => navigate('/user/city')}>
              View All <FiArrowRight size={14} />
            </button>
          </div>
          <div className="places-scroll">
            {city.famousPlaces.slice(0, 4).map((place, i) => (
              <div key={i} className="place-mini-card" style={{ backgroundImage: `url(${place.image})` }}>
                <div className="place-mini-overlay">
                  <h4>{place.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dash-card actions-card">
          <div className="card-header">
            <h3>⚡ Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action" onClick={() => navigate('/user/report')}>
              <span className="qa-icon">📋</span>
              <span>{t('reportIssue')}</span>
            </button>
            <button className="quick-action" onClick={() => navigate('/user/find-near-me')}>
              <span className="qa-icon">📍</span>
              <span>{t('findNearMe')}</span>
            </button>
            <button className="quick-action" onClick={() => navigate('/user/feedback')}>
              <span className="qa-icon">💬</span>
              <span>{t('feedback')}</span>
            </button>
            <button className="quick-action" onClick={() => navigate('/user/city')}>
              <span className="qa-icon">🏛️</span>
              <span>{t('cityInfo')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
