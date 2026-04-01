import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiNavigation, FiMapPin, FiSearch } from 'react-icons/fi';
import './FindNearMe.css';

const FindNearMe = () => {
  const { selectedCity, searchAmenities } = useCity();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('hospitals');
  const [searchQuery, setSearchQuery] = useState('');
  const [amenityResults, setAmenityResults] = useState([]);
  const [loadingAmenities, setLoadingAmenities] = useState(false);
  const city = selectedCity;

  const amenityCategories = [
    { key: 'hospitals', label: t('hospitals'), icon: '🏥', color: '#ef4444' },
    { key: 'parks', label: t('parks'), icon: '🌳', color: '#10b981' },
    { key: 'policeStations', label: t('policeStations'), icon: '🚔', color: '#3b82f6' },
    { key: 'petrolBunks', label: t('petrolBunks'), icon: '⛽', color: '#f59e0b' },
    { key: 'hotels', label: t('hotels'), icon: '🏨', color: '#8b5cf6' }
  ];

  if (!city) return <div className="loading-state">Select a city to explore amenities</div>;

  const currentAmenities = city?.amenities?.[activeCategory] || [];
  const fallbackAmenities = searchQuery
    ? currentAmenities.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentAmenities;

  const filteredAmenities = amenityResults.length ? amenityResults : fallbackAmenities;

  const activeColor = amenityCategories.find(c => c.key === activeCategory)?.color || '#6366f1';

  // Build Google Maps URL with markers
  const getMapUrl = () => {
    const center = `${city.coordinates.lat},${city.coordinates.lng}`;
    const searchTerm = activeCategory.replace(/([A-Z])/g, ' $1').trim();
    return `https://www.google.com/maps/embed/v1/search?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${searchTerm}+in+${city.name}&center=${center}&zoom=13`;
  };

  const runAmenitySearch = async (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setAmenityResults([]);
      return;
    }

    try {
      setLoadingAmenities(true);
      const result = await searchAmenities(`${value} ${activeCategory}`);
      const normalized = result.map((a, idx) => ({
        id: a.id || idx,
        name: a.name || a.title || 'Amenity',
        address: a.address || a.location || 'Address not available',
        lat: a.lat || a.latitude || city.coordinates.lat,
        lng: a.lng || a.longitude || city.coordinates.lng
      }));
      setAmenityResults(normalized);
    } catch {
      setAmenityResults([]);
    } finally {
      setLoadingAmenities(false);
    }
  };

  return (
    <div className="find-near-me">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1><FiNavigation size={24} /> {t('findNearMe')}</h1>
          <p>Discover nearby facilities and amenities in {city.name}</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="amenity-categories">
        {amenityCategories.map(cat => (
          <button
            key={cat.key}
            className={`amenity-cat-btn ${activeCategory === cat.key ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
            style={activeCategory === cat.key ? { background: cat.color, color: 'white', borderColor: cat.color } : {}}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="amenity-search">
        <FiSearch size={18} />
        <input
          type="text"
          placeholder={`Search ${amenityCategories.find(c => c.key === activeCategory)?.label}...`}
          value={searchQuery}
          onChange={e => runAmenitySearch(e.target.value)}
        />
      </div>

      <div className="find-layout">
        {/* Map */}
        <div className="find-map">
          <iframe
            title="Amenities Map"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            src={getMapUrl()}
            allowFullScreen
          />
        </div>

        {/* Amenity List */}
        <div className="amenity-list">
          <h3 style={{ color: activeColor }}>
            {amenityCategories.find(c => c.key === activeCategory)?.icon}{' '}
            {amenityCategories.find(c => c.key === activeCategory)?.label} ({filteredAmenities.length})
          </h3>
          {loadingAmenities && <p style={{ color: '#64748b', marginBottom: 12 }}>Searching amenities...</p>}
          {filteredAmenities.map((amenity, i) => (
            <div key={i} className="amenity-card">
              <div className="amenity-icon" style={{ background: activeColor + '15', color: activeColor }}>
                {amenityCategories.find(c => c.key === activeCategory)?.icon}
              </div>
              <div className="amenity-info">
                <h4>{amenity.name}</h4>
                <p><FiMapPin size={12} /> {amenity.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${amenity.lat},${amenity.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direction-btn"
                style={{ color: activeColor }}
              >
                <FiNavigation size={16} /> Directions
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindNearMe;
