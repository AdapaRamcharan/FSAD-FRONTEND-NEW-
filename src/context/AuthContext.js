import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('smartcity_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('smartcity_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email, role: found.role, city: found.city, avatar: found.avatar };
      setUser(userData);
      localStorage.setItem('smartcity_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('smartcity_users') || '[]');
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6366f1&color=fff&size=128`
    };
    users.push(newUser);
    localStorage.setItem('smartcity_users', JSON.stringify(users));
    const sessionData = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, city: newUser.city, avatar: newUser.avatar };
    setUser(sessionData);
    localStorage.setItem('smartcity_user', JSON.stringify(sessionData));
    return { success: true, user: sessionData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartcity_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('smartcity_user', JSON.stringify(updated));
  };

  // Seed default admin if not present
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('smartcity_users') || '[]');
    if (!users.find(u => u.email === 'admin@smartcity.com')) {
      users.push({
        id: 'admin-001',
        name: 'City Admin',
        email: 'admin@smartcity.com',
        password: 'admin123',
        role: 'admin',
        city: 'all',
        avatar: 'https://ui-avatars.com/api/?name=City+Admin&background=6366f1&color=fff&size=128'
      });
      localStorage.setItem('smartcity_users', JSON.stringify(users));
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
