import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiStar, FiMessageSquare, FiSend } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import './Feedback.css';

const Feedback = () => {
  const { user } = useAuth();
  const { selectedCity, feedbacks, addFeedback } = useCity();
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({ category: 'general', message: '' });

  const categories = [
    { value: 'general', label: 'General', icon: '💬' },
    { value: 'roads', label: 'Roads & Transport', icon: '🛣️' },
    { value: 'water', label: 'Water Supply', icon: '💧' },
    { value: 'sanitation', label: 'Sanitation', icon: '🧹' },
    { value: 'parks', label: 'Parks & Recreation', icon: '🌳' },
    { value: 'safety', label: 'Public Safety', icon: '🛡️' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '🎓' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }
    if (!form.message) {
      toast.error('Please enter your feedback');
      return;
    }

    try {
      await addFeedback({
        ...form,
        rating,
        city: selectedCity?.id,
        cityName: selectedCity?.name,
        userName: user?.name,
        userEmail: user?.email,
        userAvatar: user?.avatar
      });

      toast.success('Thank you for your feedback!');
      setForm({ category: 'general', message: '' });
      setRating(0);
    } catch (error) {
      toast.error(error.message || 'Unable to submit feedback');
    }
  };

  const cityFeedbacks = feedbacks.filter((f) => {
    if (!selectedCity) return false;
    return String(f.cityId ?? f.city) === String(selectedCity.id);
  });
  const avgRating = cityFeedbacks.length > 0
    ? (cityFeedbacks.reduce((sum, f) => sum + f.rating, 0) / cityFeedbacks.length).toFixed(1)
    : 'N/A';

  return (
    <div className="feedback-page">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="page-header">
        <div>
          <h1><FiMessageSquare size={24} /> {t('feedback')}</h1>
          <p>Share your experience and help improve {selectedCity?.name}'s services</p>
        </div>
      </div>

      <div className="feedback-layout">
        {/* Submit Feedback */}
        <div className="feedback-form-card">
          <h2>📝 Submit Feedback</h2>

          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Star Rating */}
            <div className="rating-section">
              <label>How would you rate city services?</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    className={`star-btn ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <FiStar size={28} />
                  </button>
                ))}
                {rating > 0 && <span className="rating-text">{rating}/5</span>}
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category</label>
              <div className="cat-chips">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    className={`cat-chip ${form.category === cat.value ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, category: cat.value })}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Your Feedback</label>
              <textarea
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              <FiSend size={16} /> Submit Feedback
            </button>
          </form>
        </div>

        {/* Feedback Summary & List */}
        <div className="feedback-sidebar">
          {/* Summary */}
          <div className="feedback-summary-card">
            <h3>📊 Feedback Summary</h3>
            <div className="fb-summary">
              <div className="fb-avg-rating">
                <span className="fb-avg-value">{avgRating}</span>
                <div className="fb-avg-stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FiStar key={s} size={16} className={s <= Math.round(avgRating) ? 'star-filled' : 'star-empty'} />
                  ))}
                </div>
                <span className="fb-count">{cityFeedbacks.length} reviews</span>
              </div>
            </div>
          </div>

          {/* Recent Feedbacks */}
          <div className="recent-feedbacks">
            <h3>Recent Feedback</h3>
            {cityFeedbacks.length === 0 ? (
              <div className="empty-state-small">
                <p>No feedback yet. Be the first to share!</p>
              </div>
            ) : (
              cityFeedbacks.slice(0, 10).map(fb => (
                <div key={fb.id} className="fb-card">
                  <div className="fb-card-header">
                    <img src={fb.userAvatar} alt="" className="fb-avatar" />
                    <div>
                      <span className="fb-name">{fb.userName}</span>
                      <span className="fb-date">{new Date(fb.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="fb-stars">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FiStar key={s} size={12} className={s <= fb.rating ? 'star-filled' : 'star-empty'} />
                      ))}
                    </div>
                  </div>
                  <span className="fb-category">{categories.find(c => c.value === fb.category)?.icon} {fb.category}</span>
                  <p className="fb-message">{fb.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
