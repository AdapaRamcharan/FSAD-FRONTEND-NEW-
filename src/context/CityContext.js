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

const normalizeCity = (city) => {
  const fallback = fallbackById[city.id] || fallbackById[city.cityId] || fallbackById[slugify(city.name)] || cityData[0];
  const id = city.id || city.cityId || slugify(city.name || fallback.name);
  return {
    ...fallback,
    ...city,
    id,
    name: city.name || fallback.name,
    description: city.description || fallback.description,
    heroImage: city.imageUrl || city.image || fallback.heroImage,
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
    if (status === 'in_progress') return 'in-progress';
    return status || 'pending';
  };

  const normalizeIssue = useCallback((issue) => ({
    ...issue,
    id: issue.id || issue.issueId || Date.now().toString(),
    status: normalizeStatus(issue.status),
    city: issue.city || issue.cityId || issue.cityName,
    createdAt: issue.createdAt || issue.createdOn || new Date().toISOString(),
    updatedAt: issue.updatedAt || issue.lastUpdated || new Date().toISOString()
  }), []);

  const normalizeFeedback = useCallback((feedback) => ({
    ...feedback,
    id: feedback.id || feedback.feedbackId || Date.now().toString(),
    city: feedback.city || feedback.cityId,
    rating: Number(feedback.rating || 0),
    createdAt: feedback.createdAt || new Date().toISOString()
  }), []);

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
      const { data } = await getWithFallback(['/api/issues', '/issues']);
      const apiIssues = asArray(data, ['issues']);
      setIssues(apiIssues.map(normalizeIssue));
    } catch {
      setIssues([]);
    }
  }, [normalizeIssue]);

  const refreshFeedbacks = useCallback(async () => {
    try {
      const { data } = await getWithFallback(['/api/feedback', '/feedbacks', '/feedback']);
      const apiFeedbacks = asArray(data, ['feedbacks']);
      setFeedbacks(apiFeedbacks.map(normalizeFeedback));
    } catch {
      setFeedbacks([]);
    }
  }, [normalizeFeedback]);

  const refreshAdminData = useCallback(async () => {
    if (user?.role !== 'admin') return;

    try {
      const [usersRes, historyRes] = await Promise.all([
        getWithFallback(['/api/users', '/users']),
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

  const selectCity = (cityId) => {
    setSelectedCityId(cityId);
  };

  const addIssue = async (issue) => {
    const payload = {
      ...issue,
      cityId: issue.city,
      city: issue.city,
      reporterName: issue.reportedBy,
      reporterEmail: issue.reporterEmail
    };

    const { data } = await api.post('/api/issues', payload);
    const created = normalizeIssue(data || payload);
    setIssues((prev) => [created, ...prev]);
    return created;
  };

  const updateIssueStatus = async (issueId, status, comment) => {
    const requestBody = { status, comment };
    await api.put(`/api/issues/${issueId}/status`, requestBody);
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
    const payload = {
      ...feedback,
      cityId: feedback.city
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
        q: query,
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
