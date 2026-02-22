import React, { useState } from 'react';
import { useCity } from '../../context/CityContext';
import { FiSearch, FiFilter, FiCheckCircle, FiClock, FiAlertTriangle, FiMapPin, FiChevronDown, FiEye, FiTool, FiX, FiMessageCircle } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import './ManageReports.css';

const ManageReports = () => {
  const { issues, updateIssueStatus, selectedCity } = useCity();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [adminComment, setAdminComment] = useState('');

  const allIssues = selectedCity
    ? issues.filter(i => i.city === selectedCity.id)
    : issues;

  const filtered = allIssues.filter(issue => {
    const matchSearch = issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description?.toLowerCase().includes(search.toLowerCase()) ||
      issue.location?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const statusCounts = {
    all: allIssues.length,
    pending: allIssues.filter(i => i.status === 'pending').length,
    'in-progress': allIssues.filter(i => i.status === 'in-progress').length,
    resolved: allIssues.filter(i => i.status === 'resolved').length
  };

  const handleStatusChange = (issueId, newStatus) => {
    updateIssueStatus(issueId, newStatus);
    toast.success(`Issue status updated to "${newStatus}"`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FiClock />;
      case 'in-progress': return <FiTool />;
      case 'resolved': return <FiCheckCircle />;
      default: return <FiClock />;
    }
  };

  return (
    <div className="manage-reports">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="page-header">
        <div>
          <h1>📋 Manage Reports</h1>
          <p>Review and manage citizen-reported issues across {selectedCity?.name || 'all cities'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mr-stats-row">
        {[
          { label: 'Total', count: statusCounts.all, color: '#6366f1', icon: <FiAlertTriangle /> },
          { label: 'Pending', count: statusCounts.pending, color: '#f59e0b', icon: <FiClock /> },
          { label: 'In Progress', count: statusCounts['in-progress'], color: '#3b82f6', icon: <FiTool /> },
          { label: 'Resolved', count: statusCounts.resolved, color: '#10b981', icon: <FiCheckCircle /> }
        ].map(stat => (
          <div key={stat.label} className="mr-stat-card" style={{ borderTopColor: stat.color }}>
            <div className="mr-stat-icon" style={{ background: stat.color + '15', color: stat.color }}>{stat.icon}</div>
            <div>
              <span className="mr-stat-count">{stat.count}</span>
              <span className="mr-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mr-filters">
        <div className="mr-search">
          <FiSearch size={16} />
          <input
            placeholder="Search reports..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="mr-filter-group">
          <FiFilter size={14} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="mr-table-wrapper">
        <table className="mr-table">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Category</th>
              <th>Location</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="empty-cell">No reports found</td></tr>
            ) : (
              filtered.map(issue => (
                <tr key={issue.id}>
                  <td className="issue-title-cell">
                    <span className="issue-title-text">{issue.title}</span>
                    <span className="issue-reporter">By {issue.reportedBy || 'Anonymous'}</span>
                  </td>
                  <td><span className="cat-badge">{issue.category}</span></td>
                  <td className="loc-cell"><FiMapPin size={12} /> {issue.location}</td>
                  <td>
                    <span className={`priority-badge priority-${issue.priority}`}>{issue.priority}</span>
                  </td>
                  <td>
                    <div className="status-select-wrapper">
                      {getStatusIcon(issue.status)}
                      <select
                        className={`status-select status-${issue.status}`}
                        value={issue.status}
                        onChange={e => handleStatusChange(issue.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <FiChevronDown size={12} className="select-arrow" />
                    </div>
                  </td>
                  <td className="date-cell">{new Date(issue.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="view-btn" onClick={() => setSelectedIssue(issue)}>
                      <FiEye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="mr-modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div className="mr-modal" onClick={e => e.stopPropagation()}>
            <div className="mr-modal-header">
              <h2>Issue Details</h2>
              <button className="modal-close" onClick={() => setSelectedIssue(null)}><FiX size={20} /></button>
            </div>
            <div className="mr-modal-body">
              <div className="modal-field">
                <label>Title</label>
                <p>{selectedIssue.title}</p>
              </div>
              <div className="modal-row">
                <div className="modal-field">
                  <label>Category</label>
                  <p>{selectedIssue.category}</p>
                </div>
                <div className="modal-field">
                  <label>Priority</label>
                  <span className={`priority-badge priority-${selectedIssue.priority}`}>{selectedIssue.priority}</span>
                </div>
                <div className="modal-field">
                  <label>Status</label>
                  <span className={`status-badge-modal status-${selectedIssue.status}`}>{selectedIssue.status}</span>
                </div>
              </div>
              <div className="modal-field">
                <label>Description</label>
                <p>{selectedIssue.description || 'No description provided.'}</p>
              </div>
              <div className="modal-field">
                <label>Location</label>
                <p><FiMapPin size={14} /> {selectedIssue.location}</p>
              </div>
              <div className="modal-field">
                <label>Reported By</label>
                <p>{selectedIssue.reportedBy || 'Anonymous'} — {new Date(selectedIssue.createdAt).toLocaleString()}</p>
              </div>

              {/* Admin Comment */}
              <div className="modal-field">
                <label><FiMessageCircle size={14} /> Admin Comment</label>
                <textarea
                  placeholder="Add a note or comment..."
                  value={adminComment}
                  onChange={e => setAdminComment(e.target.value)}
                  rows={3}
                />
                <button className="btn btn-primary btn-sm" onClick={() => {
                  toast.success('Comment saved');
                  setAdminComment('');
                }}>Save Comment</button>
              </div>

              <div className="modal-actions">
                <label>Update Status:</label>
                <div className="modal-status-btns">
                  {['pending', 'in-progress', 'resolved'].map(st => (
                    <button
                      key={st}
                      className={`modal-status-btn status-${st} ${selectedIssue.status === st ? 'active' : ''}`}
                      onClick={() => {
                        handleStatusChange(selectedIssue.id, st);
                        setSelectedIssue({ ...selectedIssue, status: st });
                      }}
                    >
                      {getStatusIcon(st)} {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReports;
