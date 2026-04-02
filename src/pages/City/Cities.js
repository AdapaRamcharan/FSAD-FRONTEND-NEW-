import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { useCity } from '../../context/CityContext';
import './Cities.css';

const Cities = () => {
  const navigate = useNavigate();
  const { cities, selectCity, selectedCity, cityLoading, cityError, refreshCities } = useCity();

  if (cityLoading) {
    return (
      <div className="cities-page">
        <div className="loading-state">Loading cities from server...</div>
      </div>
    );
  }

  return (
    <div className="cities-page">
      <div className="page-header">
        <div>
          <h1>🏙️ Cities</h1>
          <p>Explore cities from backend API: <strong>/api/cities</strong></p>
        </div>
        <button className="btn btn-outline" onClick={refreshCities}>
          <FiRefreshCw size={14} /> Refresh
        </button>
      </div>

      {cityError && (
        <div className="cities-error">
          <FiAlertCircle size={16} />
          <span>{cityError}</span>
        </div>
      )}

      <div className="cities-grid-api">
        {cities.map((city) => (
          <article key={city.id} className={`city-api-card ${selectedCity?.id === city.id ? 'active' : ''}`}>
            <div
              className="city-api-image"
              style={{ backgroundImage: `url(${city.heroImage || city.imageUrl || 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80'})` }}
            />
            <div className="city-api-content">
              <h3>{city.name}</h3>
              <p>{city.description || 'No description available'}</p>
              <div className="city-api-meta">
                <span><FiMapPin size={12} /> {city.state || 'India'}</span>
              </div>
              <button className="btn btn-primary" onClick={() => { selectCity(city.id); navigate('/user/city'); }}>
                Select City
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Cities;
