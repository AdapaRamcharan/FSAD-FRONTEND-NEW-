import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCity } from '../../context/CityContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  FiUsers, FiAlertTriangle, FiCheckCircle, FiClock,
  FiTrendingUp, FiMapPin, FiBarChart2, FiArrowUp, FiArrowDown,
  FiActivity, FiEye
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import './AdminDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler);

const AdminDashboard = () => {
  const { user } = useAuth();
  const { issues, cities, feedbacks } = useCity();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalIssues = issues.length;
  const pendingIssues = issues.filter(i => i.status === 'pending').length;
  const inProgressIssues = issues.filter(i => i.status === 'in_progress').length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;
  const users = JSON.parse(localStorage.getItem('smartcity_users') || '[]');
  const totalUsers = users.length;

  // Issue status chart
  const statusChartData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [{
      data: [pendingIssues, inProgressIssues, resolvedIssues],
      backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
      borderWidth: 0,
      cutout: '70%'
    }]
  };

  // Issues by city
  const cityIssueData = {
    labels: cities.map(c => c.name),
    datasets: [{
      label: 'Issues',
      data: cities.map(c => issues.filter(i => i.city === c.id).length),
      backgroundColor: ['#6366f1', '#f5576c', '#4facfe', '#43e97b'],
      borderRadius: 8,
      borderWidth: 0
    }]
  };

  // Issue categories
  const categories = ['pothole', 'garbage', 'water_leak', 'streetlight', 'road_damage', 'sewage'];
  const categoryLabels = ['Potholes', 'Garbage', 'Water Leak', 'Streetlight', 'Road Damage', 'Sewage'];
  const categoryCounts = categories.map(cat => issues.filter(i => i.category === cat).length);

  const categoryChartData = {
    labels: categoryLabels,
    datasets: [{
      label: 'Reports',
      data: categoryCounts,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: '#6366f1',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#6366f1',
      pointRadius: 4
    }]
  };

  // Recent Issues
  const recentIssues = [...issues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: 'Pending' },
      in_progress: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'In Progress' },
      resolved: { bg: 'rgba(16,185,129,0.1)', color: '#10b981', label: 'Resolved' }
    };
    const s = styles[status] || styles.pending;
    return <span className="status-badge" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
      medium: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
      low: { bg: 'rgba(16,185,129,0.1)', color: '#10b981' }
    };
    const s = styles[priority] || styles.medium;
    return <span className="priority-badge" style={{ background: s.bg, color: s.color }}>{priority}</span>;
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="admin-welcome">
        <div className="admin-welcome-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name}. Here's what's happening across your cities.</p>
        </div>
        <div className="admin-welcome-right">
          <div className="admin-time">
            {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="admin-date">
            {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(99,102,241,0.15)' }}>
            <FiAlertTriangle size={24} color="#6366f1" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{totalIssues}</span>
            <span className="admin-stat-label">Total Reports</span>
          </div>
          <div className="admin-stat-trend trend-up">
            <FiArrowUp size={14} /> 12%
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>
            <FiClock size={24} color="#f59e0b" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{pendingIssues}</span>
            <span className="admin-stat-label">Pending Issues</span>
          </div>
          <div className="admin-stat-trend trend-down">
            <FiArrowDown size={14} /> 5%
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <FiCheckCircle size={24} color="#10b981" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{resolvedIssues}</span>
            <span className="admin-stat-label">Resolved</span>
          </div>
          <div className="admin-stat-trend trend-up">
            <FiArrowUp size={14} /> 18%
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(14,165,233,0.15)' }}>
            <FiUsers size={24} color="#0ea5e9" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{totalUsers}</span>
            <span className="admin-stat-label">Registered Users</span>
          </div>
          <div className="admin-stat-trend trend-up">
            <FiArrowUp size={14} /> 8%
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(236,72,153,0.15)' }}>
            <FiActivity size={24} color="#ec4899" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{inProgressIssues}</span>
            <span className="admin-stat-label">In Progress</span>
          </div>
          <div className="admin-stat-trend trend-up">
            <FiArrowUp size={14} /> 3%
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(168,85,247,0.15)' }}>
            <FiEye size={24} color="#a855f7" />
          </div>
          <div className="admin-stat-info">
            <span className="admin-stat-value">{feedbacks.length}</span>
            <span className="admin-stat-label">Feedbacks</span>
          </div>
          <div className="admin-stat-trend trend-up">
            <FiArrowUp size={14} /> 22%
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="admin-charts">
        <div className="admin-chart-card">
          <h3>Issue Status Distribution</h3>
          <div className="chart-container doughnut-chart">
            <Doughnut data={statusChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true } }
              }
            }} />
          </div>
        </div>

        <div className="admin-chart-card">
          <h3>Issues by City</h3>
          <div className="chart-container">
            <Bar data={cityIssueData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
              }
            }} />
          </div>
        </div>

        <div className="admin-chart-card chart-wide">
          <h3>Issue Categories Trend</h3>
          <div className="chart-container">
            <Line data={categoryChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                x: { grid: { display: false } }
              }
            }} />
          </div>
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="admin-table-card">
        <div className="table-header">
          <h3><FiAlertTriangle size={18} /> Recent Issue Reports</h3>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View All</button>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>City</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Reported</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map(issue => (
                <tr key={issue.id}>
                  <td className="td-id">#{issue.id.slice(-4)}</td>
                  <td className="td-title">{issue.title.substring(0, 40)}...</td>
                  <td><span className="category-tag">{issue.category?.replace('_', ' ')}</span></td>
                  <td><span className="city-tag"><FiMapPin size={12} /> {issue.city}</span></td>
                  <td>{getStatusBadge(issue.status)}</td>
                  <td>{getPriorityBadge(issue.priority)}</td>
                  <td className="td-date">{new Date(issue.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* City Health Cards */}
      <div className="city-health-section">
        <h3><FiBarChart2 size={18} /> City Health Overview</h3>
        <div className="city-health-grid">
          {cities.map(city => {
            const cityIssues = issues.filter(i => i.city === city.id);
            const cityResolved = cityIssues.filter(i => i.status === 'resolved').length;
            const resolutionRate = cityIssues.length > 0 ? Math.round((cityResolved / cityIssues.length) * 100) : 100;
            return (
              <div key={city.id} className="city-health-card">
                <div className="ch-header" style={{ background: city.coverGradient }}>
                  <h4>{city.name}</h4>
                  <span>{city.state}</span>
                </div>
                <div className="ch-body">
                  <div className="ch-metric">
                    <span className="ch-metric-label">Total Issues</span>
                    <span className="ch-metric-value">{cityIssues.length}</span>
                  </div>
                  <div className="ch-metric">
                    <span className="ch-metric-label">Resolved</span>
                    <span className="ch-metric-value" style={{ color: '#10b981' }}>{cityResolved}</span>
                  </div>
                  <div className="ch-metric">
                    <span className="ch-metric-label">Resolution Rate</span>
                    <div className="ch-progress">
                      <div className="ch-progress-bar" style={{ width: `${resolutionRate}%`, background: resolutionRate > 60 ? '#10b981' : '#f59e0b' }} />
                    </div>
                    <span className="ch-percentage">{resolutionRate}%</span>
                  </div>
                  <div className="ch-metric">
                    <span className="ch-metric-label">AQI</span>
                    <span className="ch-metric-value" style={{ color: city.aqi.value > 100 ? '#ef4444' : '#f59e0b' }}>{city.aqi.value}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
