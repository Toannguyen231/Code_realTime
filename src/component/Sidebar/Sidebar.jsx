import React, { useState } from 'react';
import './Sidebar.scss';
import { FiChevronLeft, FiChevronRight, FiUsers } from 'react-icons/fi';

const MOCK_USERS = [
  { id: 1, name: 'Nguyễn Toàn', initials: 'NT', color: '#4caf50', online: true, role: 'Host' },
  { id: 2, name: 'Trần Minh', initials: 'TM', color: '#2196f3', online: true, role: 'Guest' },
  { id: 3, name: 'Lê Hoa', initials: 'LH', color: '#ff9800', online: false, role: 'Guest' },
  { id: 4, name: 'Phạm Dũng', initials: 'PD', color: '#e91e63', online: false, role: 'Guest' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onlineCount = MOCK_USERS.filter((u) => u.online).length;

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && (
          <span className="sidebar-title">
            <FiUsers size={11} style={{ marginRight: 5 }} />
            Participants
          </span>
        )}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Mở sidebar' : 'Đóng sidebar'}
        >
          {collapsed ? <FiChevronRight size={15} /> : <FiChevronLeft size={15} />}
        </button>
      </div>

      {/* User List */}
      <div className="user-list">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="user-item" title={collapsed ? user.name : ''}>
            <div className="user-avatar-sm" style={{ backgroundColor: user.color }}>
              {user.initials}
              <span className={`status-dot ${user.online ? 'online' : 'offline'}`} />
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className={`user-status-text ${user.online ? 'online-text' : ''}`}>
                {user.online ? '● Online' : '○ Offline'} · {user.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="online-summary">
          <span className="online-dot" />
          <span>{onlineCount} / {MOCK_USERS.length} online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
