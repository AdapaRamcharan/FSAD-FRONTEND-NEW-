import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import './Auth.css';

const SignIn = () => {
  const { login, isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: location.state?.email || '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(location.state?.message || '');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
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
            <h1>Welcome Back</h1>
            <p>Sign in to access your Smart City dashboard and manage city services efficiently.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span>📊</span> Real-time city dashboard
              </div>
              <div className="auth-feature">
                <span>🗺️</span> Interactive maps & navigation
              </div>
              <div className="auth-feature">
                <span>📋</span> Report & track issues
              </div>
              <div className="auth-feature">
                <span>🔔</span> Smart alerts & notifications
              </div>
            </div>
            <div className="auth-demo-info">
              <h4>Demo Credentials</h4>
              <div className="demo-creds">
                <div className="demo-cred">
                  <span className="demo-role">Admin</span>
                  <span>admin@smartcity.com / admin123</span>
                </div>
                <div className="demo-cred">
                  <span className="demo-role">User</span>
                  <span>Sign up to create account</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2>{t('signin')}</h2>
              <p>Enter your credentials to continue</p>
            </div>

            {error && (
              <div className="auth-error">
                <FiAlertCircle size={18} /> {error}
              </div>
            )}
            
            {successMsg && (
              <div className="auth-error" style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#86efac' }}>
                <FiCheckCircle size={18} /> {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
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

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#forgot" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    {t('signin')} <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-alt-actions">
              <button className="btn social-btn google-btn">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
                Continue with Google
              </button>
            </div>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
