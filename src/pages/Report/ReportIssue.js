import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import { FiCamera, FiMapPin, FiAlertTriangle, FiCheckCircle, FiClock, FiFilter } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import './ReportIssue.css';

const ReportIssue = () => {
  const { user } = useAuth();
  const { selectedCity, addIssue, issues } = useCity();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({
    title: '',
    category: 'pothole',
    description: '',
    location: '',
    priority: 'medium',
    image: null
  });

  const categories = [
    { value: 'pothole', label: 'Pothole', icon: '🕳️' },
    { value: 'garbage', label: 'Garbage', icon: '🗑️' },
    { value: 'water_leak', label: 'Water Leak', icon: '💧' },
    { value: 'streetlight', label: 'Streetlight', icon: '💡' },
    { value: 'road_damage', label: 'Road Damage', icon: '🛣️' },
    { value: 'sewage', label: 'Sewage', icon: '🚰' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await addIssue({
        ...form,
        city: selectedCity?.id,
        reportedBy: user?.name,
        reporterEmail: user?.email,
        lat: selectedCity?.coordinates.lat + (Math.random() - 0.5) * 0.05,
        lng: selectedCity?.coordinates.lng + (Math.random() - 0.5) * 0.05
      });

      toast.success('Issue reported successfully! We will look into it.');
      setForm({ title: '', category: 'pothole', description: '', location: '', priority: 'medium', image: null });
      setShowForm(false);
    } catch (error) {
      toast.error(error.message || 'Unable to report issue');
    }
  };

  const cityIssues = selectedCity
    ? issues.filter((i) => String(i.cityId ?? i.city) === String(selectedCity.id))
    : [];
  const filteredIssues = filter === 'all' ? cityIssues : cityIssues.filter(i => i.status === filter);

  const getStatusInfo = (status) => {
    const map = {
      pending: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: <FiClock size={14} />, label: 'Pending' },
      'in-progress': { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: <FiAlertTriangle size={14} />, label: 'In Progress' },
      resolved: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: <FiCheckCircle size={14} />, label: 'Resolved' }
    };
    return map[status] || map.pending;
  };

  return (
    <div className="report-page">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>{t('reportIssue')}</h1>
          <p>Report civic issues and track their resolution in {selectedCity?.name}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Report New Issue'}
        </button>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="report-form-card fade-in-up">
          <h2>📋 Report a New Issue</h2>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="rf-row">
              <div className="form-group">
                <label>Issue Title *</label>
                <input
                  type="text"
                  placeholder="Brief title describing the issue"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.icon} {c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                placeholder="Describe the issue in detail..."
                rows={4}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="rf-row">
              <div className="form-group">
                <label><FiMapPin size={14} /> Location *</label>
                <input
                  type="text"
                  placeholder="Enter the exact location (e.g., Street, Ward, Area)"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label><FiCamera size={14} /> Upload Photo (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setForm({ ...form, image: reader.result });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="file-upload-label">
                  <FiCamera size={24} />
                  <p>Click to upload or drag and drop</p>
                  <span>PNG, JPG, GIF up to 10MB</span>
                </div>
              </div>
              {form.image && (
                <div className="image-preview">
                  <img src={form.image} alt="Preview" />
                  <button type="button" onClick={() => setForm({ ...form, image: null })}>Remove</button>
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">{t('submit')} Issue Report</button>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="report-filters">
        <FiFilter size={18} />
        {[
          { value: 'all', label: 'All' },
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'resolved', label: 'Resolved' }
        ].map(f => (
          <button
            key={f.value}
            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            <span className="filter-count">
              {f.value === 'all' ? cityIssues.length : cityIssues.filter(i => i.status === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="issues-list">
        {filteredIssues.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h3>No issues found</h3>
            <p>There are no {filter !== 'all' ? filter.replace('-', ' ') : ''} issues in {selectedCity?.name}</p>
          </div>
        ) : (
          filteredIssues.map(issue => {
            const statusInfo = getStatusInfo(issue.status);
            return (
              <div key={issue.id} className="issue-card">
                <div className="issue-card-left">
                  <div className="issue-category-icon">
                    {categories.find(c => c.value === issue.category)?.icon || '📌'}
                  </div>
                  <div className="issue-info">
                    <h3>{issue.title}</h3>
                    <p>{issue.description?.substring(0, 100)}...</p>
                    <div className="issue-meta">
                      <span><FiMapPin size={12} /> {issue.location}</span>
                      <span><FiClock size={12} /> {new Date(issue.createdAt).toLocaleDateString()}</span>
                      <span>By: {issue.reportedBy}</span>
                    </div>
                  </div>
                </div>
                <div className="issue-card-right">
                  <span className="issue-status" style={{ background: statusInfo.bg, color: statusInfo.color }}>
                    {statusInfo.icon} {statusInfo.label}
                  </span>
                  <span className={`issue-priority priority-${issue.priority}`}>
                    {issue.priority?.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReportIssue;
