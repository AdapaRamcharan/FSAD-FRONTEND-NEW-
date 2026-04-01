import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { extractToken, extractUserPayload, setAuthToken, unwrapData } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const mapUserFromResponse = (payload = {}) => {
  const response = unwrapData(payload) || {};
  const source = extractUserPayload(response) || {};
  const role = (source.role || response.role || source.authorities?.[0] || 'user').toString().toLowerCase();
  return {
    id: source.id || source.userId || source.email,
    name: source.name || source.fullName || source.username || 'Citizen',
    email: source.email || response.email,
    role,
    city: source.city || source.cityId || 'hyderabad',
    avatar: source.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(source.name || 'User')}&background=6366f1&color=fff&size=128`
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('smartcity_auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      if (parsed?.token) {
        setAuthToken(parsed.token);
      }
      if (parsed?.user) {
        setUser(parsed.user);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setAuthError('');
      const { data } = await api.post('/auth/login', { email, password });
      const token = extractToken(data);
      const userData = mapUserFromResponse(data);

      if (!token) {
        throw new Error('Login succeeded but no auth token was returned');
      }

      setAuthToken(token);
      setUser(userData);
      localStorage.setItem('smartcity_auth', JSON.stringify({ token, user: userData }));
      return { success: true, user: userData };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message || 'Invalid email or password' };
    }
  };

  const signup = async (userData) => {
    try {
      setAuthError('');
      const { data } = await api.post('/auth/signup', userData);
      const token = extractToken(data);
      const sessionData = mapUserFromResponse(data.user ? data : { ...unwrapData(data), user: userData });

      if (token) {
        setAuthToken(token);
      }

      setUser(sessionData);
      localStorage.setItem('smartcity_auth', JSON.stringify({ token: token || null, user: sessionData }));
      return { success: true, user: sessionData };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setAuthError('');
    setAuthToken(null);
    localStorage.removeItem('smartcity_auth');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    const savedAuth = JSON.parse(localStorage.getItem('smartcity_auth') || '{}');
    localStorage.setItem('smartcity_auth', JSON.stringify({ ...savedAuth, user: updated }));
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, authError, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
