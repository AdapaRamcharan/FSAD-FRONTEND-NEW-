import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { cityData } from '../data/cityData';
import api, { asArray, getWithFallback } from '../services/api';
import { useAuth } from './AuthContext';

const CityContext = createContext(null);
export const useCity = () => useContext(CityContext);

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const fallbackById = cityData.reduce((acc, city) => {
  acc[city.id] = city;
  acc[slugify(city.name)] = city;
  return acc;
}, {});

const cityHeroOverrides = {
  hyderabad: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
  mumbai: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1200&q=80',
  delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  chennai: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80'
};

const normalizeCity = (city) => {
  const fallback = fallbackById[city.id] || fallbackById[city.cityId] || fallbackById[slugify(city.name)] || cityData[0];
  const id = city.id || city.cityId || slugify(city.name || fallback.name);
  const cityKey = slugify(city.name || fallback.name);
  return {
    ...fallback,
    ...city,
    id,
    name: city.name || fallback.name,
    description: city.description || fallback.description,
    heroImage: cityHeroOverrides[cityKey] || cityHeroOverrides[id] || city.imageUrl || city.image || fallback.heroImage,
    coverGradient: city.coverGradient || fallback.coverGradient,
    coordinates: city.coordinates || fallback.coordinates,
    amenities: city.amenities || fallback.amenities,
    weather: city.weather || fallback.weather,
    aqi: city.aqi || fallback.aqi,
    trafficInfo: city.trafficInfo || fallback.trafficInfo,
    news: city.news || fallback.news,
    emergencyContacts: city.emergencyContacts || fallback.emergencyContacts,
    famousPlaces: city.famousPlaces || fallback.famousPlaces,
    popularFoods: city.popularFoods || fallback.popularFoods
  };
};

export const CityProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cities, setCities] = useState(cityData);
  const [selectedCityId, setSelectedCityId] = useState(cityData[0]?.id || 'hyderabad');
  const [issues, setIssues] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [roleStats, setRoleStats] = useState({ admin: 0, user: 0 });
  const [cityLoading, setCityLoading] = useState(true);
  const [cityError, setCityError] = useState('');

  const selectedCity = useMemo(() => {
    return cities.find((city) => city.id === selectedCityId) || cities[0] || null;
  }, [cities, selectedCityId]);

  const normalizeStatus = (status) => {
    const value = (status || '').toString().trim().toLowerCase();
    if (!value) return 'pending';
    if (value === 'open') return 'pending';
    if (value === 'in_progress') return 'in-progress';
    if (value === 'in-progress') return 'in-progress';
    if (value === 'closed') return 'resolved';
    if (value === 'resolved') return 'resolved';
    if (value === 'pending') return 'pending';
    return 'pending';
  };

  const asNumericId = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  };

  const resolveCityRecord = useCallback((value) => {
    const rawValue = typeof value === 'object' && value ? (value.id || value.cityId || value.name) : value;
    const lookupKey = slugify(rawValue || '');
    return (
      cities.find((city) => String(city.id) === String(rawValue)) ||
      cities.find((city) => String(city.cityId) === String(rawValue)) ||
      cities.find((city) => slugify(city.name) === lookupKey) ||
      fallbackById[lookupKey] ||
      null
    );
  }, [cities]);

  const buildCityPayload = useCallback((value) => {
    const matchedCity = resolveCityRecord(value) || selectedCity || null;
    const cityId = matchedCity?.id ?? asNumericId(value) ?? null;
    const cityName = matchedCity?.name || (typeof value === 'string' ? value : value?.name) || selectedCity?.name || '';

    return {
      city: cityId != null ? { id: cityId, name: cityName } : { name: cityName },
      cityId: cityId != null ? cityId : undefined,
      cityName
    };
  }, [resolveCityRecord, selectedCity]);

  const normalizeIssue = useCallback((issue) => ({
    ...issue,
    id: issue.id || issue.issueId || Date.now().toString(),
    status: normalizeStatus(issue.status),
    city: typeof issue.city === 'object' && issue.city ? (issue.city.name || selectedCity?.name || 'City') : (issue.cityName || issue.city || issue.cityId),
    cityId: typeof issue.city === 'object' && issue.city ? issue.city.id : (issue.cityId || asNumericId(issue.city)),
    reportedBy: issue.reportedBy || issue.reporterName || issue.userName || issue.user?.username || issue.user?.name || 'Anonymous',
    reporterEmail: issue.reporterEmail || issue.user?.email || '',
    priority: (issue.priority || 'medium').toString().toLowerCase(),
    location: issue.location || 'Not provided',
    createdAt: issue.createdAt || issue.createdOn || issue.timestamp || new Date().toISOString(),
    updatedAt: issue.updatedAt || issue.lastUpdated || issue.timestamp || new Date().toISOString()
  }), [selectedCity]);

  const normalizeFeedback = useCallback((feedback) => ({
    ...feedback,
    id: feedback.id || feedback.feedbackId || Date.now().toString(),
    city: typeof feedback.city === 'object' && feedback.city ? (feedback.city.name || selectedCity?.name || 'City') : (feedback.cityName || feedback.city || feedback.cityId),
    cityId: typeof feedback.city === 'object' && feedback.city ? feedback.city.id : (feedback.cityId || asNumericId(feedback.city)),
    message: feedback.comment || feedback.message || '',
    category: feedback.category || 'general',
    rating: Number(feedback.rating || 0),
    createdAt: feedback.timestamp || feedback.createdAt || new Date().toISOString()
  }), [selectedCity]);

  const refreshCities = useCallback(async () => {
    setCityLoading(true);
    try {
      const { data } = await getWithFallback(['/api/cities', '/cities']);
      const apiCities = asArray(data, ['cities']);
      const merged = apiCities.length ? apiCities.map(normalizeCity) : cityData;
      setCities(merged);
      setCityError('');

      if (!selectedCityId && merged[0]) {
        setSelectedCityId(merged[0].id);
      }
    } catch (error) {
      setCityError(error.message);
      setCities(cityData);
    } finally {
      setCityLoading(false);
    }
  }, [selectedCityId]);

  const refreshIssues = useCallback(async () => {
    try {
      const { data } = await getWithFallback(['/api/admin/issues', '/api/issues', '/issues', '/admin/issues']);
      const apiIssues = asArray(data, ['issues']);
      setIssues(apiIssues.map(normalizeIssue));
    } catch {
      setIssues([]);
    }
  }, [normalizeIssue]);

  const refreshFeedbacks = useCallback(async () => {
    try {
      const { data } = await getWithFallback(['/api/admin/feedback', '/api/feedback', '/feedbacks', '/feedback', '/admin/feedback']);
      const apiFeedbacks = asArray(data, ['feedbacks']);
      setFeedbacks(apiFeedbacks.map(normalizeFeedback));
    } catch {
      setFeedbacks([]);
    }
  }, [normalizeFeedback]);

  const refreshAdminData = useCallback(async () => {
    if ((user?.role || '').toLowerCase() !== 'admin') return;

    try {
      const [usersRes, historyRes] = await Promise.all([
        getWithFallback(['/api/admin/users', '/api/users', '/users', '/admin/users']),
        getWithFallback(['/api/admin/login-history', '/api/login-history', '/admin/login-history'])
      ]);

      const apiUsers = asArray(usersRes.data, ['users']);
      const history = asArray(historyRes.data, ['history', 'loginHistory']);

      setUsers(apiUsers);
      setLoginHistory(history);
      setRoleStats({
        admin: apiUsers.filter((u) => (u.role || '').toLowerCase() === 'admin').length,
        user: apiUsers.filter((u) => (u.role || '').toLowerCase() === 'user').length
      });
    } catch {
      setUsers([]);
      setLoginHistory([]);
      setRoleStats({ admin: 0, user: 0 });
    }
  }, [user?.role]);

  useEffect(() => {
    refreshCities();
  }, [refreshCities]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIssues([]);
      setFeedbacks([]);
      setUsers([]);
      setLoginHistory([]);
      setRoleStats({ admin: 0, user: 0 });
      return;
    }

    refreshIssues();
    refreshFeedbacks();
    refreshAdminData();
  }, [isAuthenticated, user?.role, refreshIssues, refreshFeedbacks, refreshAdminData]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;

    // Lightweight polling keeps citizen/admin dashboards synchronized without manual refresh.
    const timer = setInterval(() => {
      refreshIssues();
      refreshFeedbacks();
      refreshAdminData();
    }, 8000);

    return () => clearInterval(timer);
  }, [isAuthenticated, refreshIssues, refreshFeedbacks, refreshAdminData]);

  const selectCity = (cityId) => {
    setSelectedCityId(cityId);
  };

  const addIssue = async (issue) => {
    const cityPayload = buildCityPayload(issue.cityId || issue.city || selectedCity?.id || selectedCity?.name);
    const payload = {
      ...issue,
      ...cityPayload,
      user: user && user.id ? { id: user.id } : null,
      reporterName: issue.reportedBy,
      reporterEmail: issue.reporterEmail,
      cityName: issue.cityName || cityPayload.cityName
    };

    const { data } = await api.post('/api/issues', payload);
    const created = normalizeIssue(data || payload);
    setIssues((prev) => [created, ...prev]);
    return created;
  };

  const updateIssueStatus = async (issueId, status, comment) => {
    const requestBody = { status, comment };
    // Wait, backend expects PUT with query param status: /api/admin/issues/{id}?status=XXX 
    await api.put(`/api/admin/issues/${issueId}?status=${status}`, requestBody);
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              status,
              updatedAt: new Date().toISOString(),
              comments: comment
                ? [...(issue.comments || []), { text: comment, by: user?.name || 'Admin', date: new Date().toISOString() }]
                : issue.comments
            }
          : issue
      )
    );
  };

  const addFeedback = async (feedback) => {
    const cityPayload = buildCityPayload(feedback.cityId || feedback.city || selectedCity?.id || selectedCity?.name);
    const payload = {
      ...feedback,
      comment: feedback.message, // Backend expects 'comment'
      ...cityPayload,
      user: user && user.id ? { id: user.id } : null,
      cityName: feedback.cityName || cityPayload.cityName
    };
    const { data } = await api.post('/api/feedback', payload);
    const created = normalizeFeedback(data || payload);
    setFeedbacks((prev) => [created, ...prev]);
    return created;
  };

  const searchAmenities = async (query) => {
    const cityId = selectedCity?.id;
    const { data } = await api.get('/api/amenities/search', {
      params: {
        name: query,
        cityId
      }
    });
    return asArray(data, ['amenities']);
  };

  return (
    <CityContext.Provider value={{
      cities,
      selectedCity,
      selectCity,
      issues,
      addIssue,
      updateIssueStatus,
      feedbacks,
      addFeedback,
      users,
      roleStats,
      loginHistory,
      cityLoading,
      cityError,
      refreshCities,
      refreshIssues,
      refreshFeedbacks,
      refreshAdminData,
      searchAmenities
    }}>
      {children}
    </CityContext.Provider>
  );
};
