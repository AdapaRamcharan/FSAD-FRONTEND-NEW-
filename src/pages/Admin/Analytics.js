import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FiTrendingUp, FiBarChart2, FiPieChart, FiActivity, FiCalendar } from 'react-icons/fi';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

const Analytics = () => {
  const { issues, feedbacks, cities } = useCity();
  const [period, setPeriod] = useState('all');

  // Issues by city
  const issuesByCity = cities.map(c => issues.filter(i => String(i.cityId ?? i.city) === String(c.id)).length);
  const resolvedByCity = cities.map(c => issues.filter(i => String(i.cityId ?? i.city) === String(c.id) && i.status === 'resolved').length);

  // Issue categories
  const categories = [...new Set(issues.map(i => i.category))];
  const issuesByCat = categories.map(cat => issues.filter(i => i.category === cat).length);

  // Status breakdown
  const pendingCount = issues.filter(i => i.status === 'pending').length;
  const inProgressCount = issues.filter(i => i.status === 'in-progress').length;
  const resolvedCount = issues.filter(i => i.status === 'resolved').length;

  // Resolution rate
  const resolveRate = issues.length > 0 ? ((resolvedCount / issues.length) * 100).toFixed(1) : 0;

  // Monthly trend (simulated)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyIssues = [12, 19, 25, 18, 30, issues.length];
  const monthlyResolved = [8, 14, 20, 15, 22, resolvedCount];

  // Complaints by City (Bar)
  const cityBarData = {
    labels: cities.map(c => c.name),
    datasets: [
      {
        label: 'Total Issues',
        data: issuesByCity,
        backgroundColor: ['rgba(99,102,241,0.7)', 'rgba(16,185,129,0.7)', 'rgba(245,158,11,0.7)', 'rgba(239,68,68,0.7)'],
        borderRadius: 8
      },
      {
        label: 'Resolved',
        data: resolvedByCity,
        backgroundColor: ['rgba(99,102,241,0.3)', 'rgba(16,185,129,0.3)', 'rgba(245,158,11,0.3)', 'rgba(239,68,68,0.3)'],
        borderRadius: 8
      }
    ]
  };

  // Status Doughnut
  const statusDoughnut = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [{
      data: [pendingCount, inProgressCount, resolvedCount],
      backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
      borderWidth: 0,
      cutout: '72%'
    }]
  };

  // Trend Line
  const trendLineData = {
    labels: months,
    datasets: [
      {
        label: 'Reported',
        data: monthlyIssues,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99,102,241,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#6366f1'
      },
      {
        label: 'Resolved',
        data: monthlyResolved,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#10b981'
      }
    ]
  };

  // Category bar
  const categoryBarData = {
    labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
    datasets: [{
      label: 'Issues',
      data: issuesByCat,
      backgroundColor: 'rgba(99,102,241,0.65)',
      borderRadius: 6
    }]
  };

  // Average feedback rating
  const avgFeedback = feedbacks.length > 0
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : 'N/A';

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1><FiBarChart2 size={24} /> Analytics</h1>
          <p>Comprehensive insight into city management performance</p>
        </div>
        <div className="period-selector">
          <FiCalendar size={14} />
          <select value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="an-kpi-row">
        <div className="an-kpi-card">
          <div className="an-kpi-icon" style={{ background: '#eef2ff', color: '#6366f1' }}><FiActivity size={20} /></div>
          <div className="an-kpi-info">
            <span className="an-kpi-value">{issues.length}</span>
            <span className="an-kpi-label">Total Issues</span>
          </div>
          <span className="an-kpi-trend up">+12%</span>
        </div>
        <div className="an-kpi-card">
          <div className="an-kpi-icon" style={{ background: '#f0fdf4', color: '#10b981' }}><FiTrendingUp size={20} /></div>
          <div className="an-kpi-info">
            <span className="an-kpi-value">{resolveRate}%</span>
            <span className="an-kpi-label">Resolution Rate</span>
          </div>
          <span className="an-kpi-trend up">+5.2%</span>
        </div>
        <div className="an-kpi-card">
          <div className="an-kpi-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><FiPieChart size={20} /></div>
          <div className="an-kpi-info">
            <span className="an-kpi-value">{avgFeedback}</span>
            <span className="an-kpi-label">Avg. Rating</span>
          </div>
          <span className="an-kpi-trend neutral">~</span>
        </div>
        <div className="an-kpi-card">
          <div className="an-kpi-icon" style={{ background: '#fef2f2', color: '#ef4444' }}><FiBarChart2 size={20} /></div>
          <div className="an-kpi-info">
            <span className="an-kpi-value">{pendingCount}</span>
            <span className="an-kpi-label">Pending</span>
          </div>
          <span className="an-kpi-trend down">-3</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="an-charts-grid">
        <div className="an-chart-card wide">
          <h3><FiTrendingUp size={16} /> Issue Trend (Monthly)</h3>
          <div className="chart-container">
            <Line data={trendLineData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
              scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
            }} />
          </div>
        </div>

        <div className="an-chart-card">
          <h3><FiPieChart size={16} /> Status Breakdown</h3>
          <div className="chart-container donut-container">
            <Doughnut data={statusDoughnut} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } }
            }} />
            <div className="donut-center">
              <span className="donut-total">{issues.length}</span>
              <span className="donut-label">Total</span>
            </div>
          </div>
        </div>

        <div className="an-chart-card">
          <h3><FiBarChart2 size={16} /> Issues by City</h3>
          <div className="chart-container">
            <Bar data={cityBarData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'bottom' } },
              scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } }
            }} />
          </div>
        </div>

        <div className="an-chart-card wide">
          <h3><FiBarChart2 size={16} /> Issues by Category</h3>
          <div className="chart-container">
            <Bar data={categoryBarData} options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: { x: { beginAtZero: true, grid: { color: '#f1f5f9' } }, y: { grid: { display: false } } }
            }} />
          </div>
        </div>
      </div>

      {/* City Performance Table */}
      <div className="an-perf-card">
        <h3>🏙️ City Performance Overview</h3>
        <table className="an-perf-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Total Issues</th>
              <th>Resolved</th>
              <th>Pending</th>
              <th>Resolution Rate</th>
              <th>Avg AQI</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, i) => {
              const cityIssues = issues.filter(is => String(is.cityId ?? is.city) === String(city.id));
              const cityResolved = cityIssues.filter(is => is.status === 'resolved').length;
              const cityPending = cityIssues.filter(is => is.status === 'pending').length;
              const rate = cityIssues.length > 0 ? ((cityResolved / cityIssues.length) * 100).toFixed(0) : 0;
              return (
                <tr key={city.id}>
                  <td className="city-name-cell">
                    <span className="city-dot" style={{ background: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'][i] }}></span>
                    {city.name}
                  </td>
                  <td>{cityIssues.length}</td>
                  <td className="text-success">{cityResolved}</td>
                  <td className="text-warning">{cityPending}</td>
                  <td>
                    <div className="rate-bar">
                      <div className="rate-fill" style={{ width: rate + '%', background: rate > 60 ? '#10b981' : rate > 30 ? '#f59e0b' : '#ef4444' }}></div>
                    </div>
                    <span className="rate-text">{rate}%</span>
                  </td>
                  <td>{city.aqi?.value || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
