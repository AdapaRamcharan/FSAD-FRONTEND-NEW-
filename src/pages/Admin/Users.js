import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { FiSearch, FiUsers, FiShield, FiUser, FiMail, FiMapPin, FiCalendar, FiEdit2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import './Users.css';

const Users = () => {
  const { users } = useCity();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const normalizedUsers = users.map((u, idx) => ({
    id: u.id || u.userId || idx + 1,
    name: u.username || u.name || u.fullName || 'User',
    email: u.email || 'N/A',
    role: (u.role || 'user').toLowerCase(),
    city: u.city || u.cityId || 'n/a',
    avatar: u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.username || u.name || 'User')}&background=6366f1&color=fff`,
    joinDate: u.joinDate || u.createdAt || new Date().toISOString(),
    status: (u.status || 'active').toLowerCase()
  }));

  const filtered = normalizedUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const adminCount = normalizedUsers.filter(u => u.role === 'admin').length;
  const userCount = normalizedUsers.filter(u => u.role === 'user').length;
  const activeCount = normalizedUsers.filter(u => u.status === 'active').length;

  return (
    <div className="users-page">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="page-header">
        <div>
          <h1><FiUsers size={24} /> Users Management</h1>
          <p>Manage all platform users and their roles</p>
        </div>
      </div>

      {/* Stats */}
      <div className="usr-stats-row">
        <div className="usr-stat-card">
          <div className="usr-stat-icon" style={{ background: '#eef2ff', color: '#6366f1' }}><FiUsers size={20} /></div>
          <div>
            <span className="usr-stat-count">{normalizedUsers.length}</span>
            <span className="usr-stat-label">Total Users</span>
          </div>
        </div>
        <div className="usr-stat-card">
          <div className="usr-stat-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><FiShield size={20} /></div>
          <div>
            <span className="usr-stat-count">{adminCount}</span>
            <span className="usr-stat-label">Admins</span>
          </div>
        </div>
        <div className="usr-stat-card">
          <div className="usr-stat-icon" style={{ background: '#f0fdf4', color: '#10b981' }}><FiUser size={20} /></div>
          <div>
            <span className="usr-stat-count">{userCount}</span>
            <span className="usr-stat-label">Citizens</span>
          </div>
        </div>
        <div className="usr-stat-card">
          <div className="usr-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}><FiCalendar size={20} /></div>
          <div>
            <span className="usr-stat-count">{activeCount}</span>
            <span className="usr-stat-label">Active</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="usr-filters">
        <div className="usr-search">
          <FiSearch size={16} />
          <input
            placeholder="Search users by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="usr-filter-tabs">
          {['all', 'admin', 'user'].map(r => (
            <button
              key={r}
              className={`usr-filter-tab ${roleFilter === r ? 'active' : ''}`}
              onClick={() => setRoleFilter(r)}
            >
              {r === 'all' ? 'All' : r === 'admin' ? 'Admins' : 'Citizens'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="usr-grid">
        {filtered.map(u => (
          <div key={u.id} className="usr-card">
            <div className="usr-card-top">
              <img src={u.avatar} alt={u.name} className="usr-avatar" />
              <span className={`usr-status-dot ${u.status}`}></span>
              <div className="usr-card-actions">
                <button className="usr-action-btn" title="Edit" onClick={() => toast.info('Edit user coming soon')}>
                  <FiEdit2 size={14} />
                </button>
              </div>
            </div>
            <h4 className="usr-name">{u.name}</h4>
            <span className={`usr-role-badge ${u.role}`}>
              {u.role === 'admin' ? <><FiShield size={11} /> Admin</> : <><FiUser size={11} /> Citizen</>}
            </span>
            <div className="usr-info-list">
              <div className="usr-info-item">
                <FiMail size={13} />
                <span>{u.email}</span>
              </div>
              <div className="usr-info-item">
                <FiMapPin size={13} />
                <span className="capitalize">{u.city}</span>
              </div>
              <div className="usr-info-item">
                <FiCalendar size={13} />
                <span>Joined {new Date(u.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
