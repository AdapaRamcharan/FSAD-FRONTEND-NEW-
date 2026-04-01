import React from 'react';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiMapPin, FiUsers, FiCloud, FiWind, FiDroplet, FiPhone } from 'react-icons/fi';
import './CityDetails.css';

const CityDetails = () => {
  const { selectedCity } = useCity();
  const { t } = useLanguage();
  const city = selectedCity;
  const weather = city?.weather || { temp: '--', condition: 'N/A', humidity: '--', wind: '--' };
  const aqi = city?.aqi || { value: '--', color: '#64748b', level: 'N/A' };
  const coordinates = city?.coordinates || { lat: 20.5937, lng: 78.9629 };
  const famousPlaces = city?.famousPlaces || [];
  const popularFoods = city?.popularFoods || [];
  const emergencyContacts = city?.emergencyContacts || [];

  if (!city) return <div className="loading-state">Select a city to view details</div>;

  return (
    <div className="city-details">
      {/* City Hero */}
      <div className="city-hero" style={{ backgroundImage: `url(${city.heroImage})` }}>
        <div className="city-hero-overlay" style={{ background: city.coverGradient, opacity: 0.7 }} />
        <div className="city-hero-content">
          <h1>{city.name}</h1>
          <p className="city-hero-tagline">{city.tagline}</p>
          <div className="city-hero-meta">
            <span><FiMapPin size={16} /> {city.state}</span>
            <span><FiUsers size={16} /> {city.population}</span>
            <span><FiCloud size={16} /> {weather.temp}°C</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="city-section">
        <h2>{t('cityInfo')}</h2>
        <div className="city-about-grid">
          <div className="city-about-text">
            <p>{city.description}</p>
            <div className="city-quick-facts">
              <div className="fact"><strong>Area:</strong> {city.area}</div>
              <div className="fact"><strong>Languages:</strong> {city.language}</div>
              <div className="fact"><strong>Climate:</strong> {city.climate}</div>
              <div className="fact"><strong>Population:</strong> {city.population}</div>
            </div>
          </div>
          <div className="city-weather-card">
            <h3>Current Weather</h3>
            <div className="cw-main">
              <span className="cw-temp">{weather.temp}°C</span>
              <span className="cw-condition">{weather.condition}</span>
            </div>
            <div className="cw-details">
              <div><FiDroplet /> Humidity: {weather.humidity}%</div>
              <div><FiWind /> Wind: {weather.wind} km/h</div>
            </div>
            <div className="cw-aqi">
              <span>AQI: <strong style={{ color: aqi.color }}>{aqi.value}</strong></span>
              <span className="aqi-tag" style={{ background: aqi.color + '20', color: aqi.color }}>{aqi.level}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Famous Places */}
      <div className="city-section">
        <h2>⭐ {t('famousPlaces')}</h2>
        <div className="famous-places-grid">
          {famousPlaces.map((place, i) => (
            <div key={i} className="famous-place-card">
              <div className="fpc-image" style={{ backgroundImage: `url(${place.image})` }} />
              <div className="fpc-content">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Foods */}
      <div className="city-section">
        <h2>🍽️ Popular Foods</h2>
        <div className="foods-grid">
          {popularFoods.map((food, i) => (
            <div key={i} className="food-card">
              <div className="food-image" style={{ backgroundImage: `url(${food.image})` }} />
              <h4>{food.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="city-section">
        <h2>🚨 {t('emergency')}</h2>
        <div className="emergency-grid">
          {emergencyContacts.map((c, i) => (
            <div key={i} className="em-card">
              <span className="em-icon">{c.icon}</span>
              <div>
                <h4>{c.name}</h4>
                <a href={`tel:${c.number}`}><FiPhone size={14} /> {c.number}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Map */}
      <div className="city-section">
        <h2>🗺️ City Map</h2>
        <div className="city-full-map">
          <iframe
            title={`${city.name} Map`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${coordinates.lat},${coordinates.lng}&zoom=12`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
