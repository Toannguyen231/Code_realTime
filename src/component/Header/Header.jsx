import React, { useState } from 'react';
import './Header.scss';
import { FiPlay, FiShare2, FiCopy, FiCheck, FiChevronDown } from 'react-icons/fi';
import { LiaEarlybirds } from 'react-icons/lia';

const MOCK_USERS = [
  { id: 1, name: 'Nguyễn Toàn', initials: 'NT', color: '#4caf50', online: true },
  { id: 2, name: 'Trần Minh',   initials: 'TM', color: '#2196f3', online: true },
];

const LANGUAGES = ['C++', 'Python', 'Java', 'JavaScript'];

const Header = ({ onRun, isRunning, language, setLanguage, roomId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId || 'ABC-123').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const link = `${window.location.origin}?room=${roomId || 'ABC-123'}`;
    navigator.clipboard.writeText(link).catch(() => {});
    alert(`🔗 Đã copy link tham gia:\n${link}`);
  };

  return (
    <header className="header">
      {/* LEFT */}
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          CodeRoom
        </div>

        <div className="divider-v" />

        <div className="room-badge">
          <span className="room-label">Room</span>
          <span className="room-id">{roomId || 'ABC-123'}</span>
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy Room ID"
          >
            {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
          </button>
        </div>

        {/* Language selector */}
        <div className="lang-select-wrap">
          <select
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <FiChevronDown
            size={12}
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }}
          />
        </div>
      </div>

      {/* CENTER */}
      <div className="header-center">
        <button
          id="btn-run-code"
          className={`btn-run ${isRunning ? 'running' : ''}`}
          onClick={onRun}
          disabled={isRunning}
        >
          <FiPlay size={13} />
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <div className="user-avatars">
          {MOCK_USERS.filter((u) => u.online).map((u) => (
            <div
              key={u.id}
              className="user-avatar"
              style={{ backgroundColor: u.color }}
              title={`${u.name} (online)`}
            >
              {u.initials}
            </div>
          ))}
        </div>
        <span className="user-count-badge">
          {MOCK_USERS.filter((u) => u.online).length} online
        </span>

        <div className="divider-v" />

        <button id="btn-share" className="btn-share" onClick={handleShare}>
          <FiShare2 size={13} />
          Share
        </button>
      </div>
    </header>
  );
};

export default Header;
