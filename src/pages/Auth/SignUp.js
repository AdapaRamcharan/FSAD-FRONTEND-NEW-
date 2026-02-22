import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { cityData } from '../../data/cityData';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiMapPin } from 'react-icons/fi';
import './Auth.css';

const SignUp = () => {
  const { signup, isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user', city: 'hyderabad' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        city: form.city
      });
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
      </div>

      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="auth-brand" onClick={() => navigate('/')}>
              <span className="logo-icon">🏙️</span>
              <span className="logo-text">SmartCity</span>
            </div>
            <h1>Join Smart City</h1>
            <p>Create your account to start exploring and contributing to smarter cities across India.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span>🏙️</span> Access 4 major Indian cities
              </div>
              <div className="auth-feature">
                <span>📱</span> Report civic issues instantly
              </div>
              <div className="auth-feature">
                <span>🗺️</span> Find amenities near you
              </div>
              <div className="auth-feature">
                <span>⭐</span> Rate & review city services
              </div>
            </div>

            <div className="auth-city-previews">
              {cityData.map(city => (
                <div key={city.id} className="auth-city-pill">
                  <img
                    src={city.heroImage}
                    alt={city.name}
                    className="auth-city-img"
                  />
                  <span>{city.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>{t('signup')}</h2>
              <p>Create your Smart City account</p>
            </div>

            {error && (
              <div className="auth-error">
                <FiAlertCircle size={18} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create password"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      required
                    />
                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={form.confirmPassword}
                      onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <div className="input-wrapper">
                    <FiUser className="input-icon" />
                    <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="user">Citizen (User)</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <div className="input-wrapper">
                    <FiMapPin className="input-icon" />
                    <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                      {cityData.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <label className="checkbox-label" style={{ marginBottom: 16 }}>
                <input type="checkbox" required /> I agree to the Terms of Service and Privacy Policy
              </label>

              <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    Create Account <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <p className="auth-switch">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
