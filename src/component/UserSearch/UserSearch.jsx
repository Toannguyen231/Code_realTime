import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import API from '../../api';
import { resolveAvatar } from '../../utils/avatar';
import { getRankImage } from '../../utils/rankImages';
import './UserSearch.scss';

const RANK_COLORS = {
  'Sắt': '#A0AEC0',
  'Đồng': '#B45309',
  'Bạc': '#BFDBFE',
  'Vàng': '#FCD34D',
  'Tinh Anh': '#A78BFA',
  'Kim Cương': '#06B6D4',
  'Thách Đấu': '#FF6B6B',
};

const UserSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Search with debounce
  const searchUsers = useCallback(async (q) => {
    if (!q || q.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.get('/users/search', { params: { q: q.trim(), limit: 8 } });
      if (data.success) {
        setResults(data.users);
        setOpen(data.users.length > 0);
      }
    } catch (err) {
      console.error('User search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchUsers(val);
    }, 300);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleSelect = (user) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    navigate(`/user/${user._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup debounce
  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  // Highlight matching text
  const highlightMatch = (text, q) => {
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="us-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="us-wrap" ref={wrapRef}>
      <div className={`us-input-wrap ${open ? 'active' : ''}`}>
        <FiSearch className="us-icon" size={14} />
        <input
          ref={inputRef}
          className="us-input"
          type="text"
          placeholder="Tìm người dùng..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          autoComplete="off"
        />
        {query && (
          <button className="us-clear" onClick={handleClear} type="button">
            <FiX size={13} />
          </button>
        )}
        {loading && <div className="us-spinner" />}
      </div>

      {open && results.length > 0 && (
        <div className="us-dropdown">
          {results.map((user) => {
            const avatar = resolveAvatar(user);
            return (
              <div
                key={user._id}
                className="us-result"
                onClick={() => handleSelect(user)}
              >
                <div className="us-result-avatar">
                  {avatar.type === 'image' ? (
                    <img src={avatar.src} alt="" className="us-avatar-img" />
                  ) : (
                    <div className="us-avatar-initials" style={{ background: avatar.color }}>
                      {avatar.initials}
                    </div>
                  )}
                </div>
                <div className="us-result-info">
                  <span className="us-result-name">{highlightMatch(user.username, query)}</span>
                  <span className="us-result-meta">
                    {(user.totalPoints || 0).toLocaleString()} pts · {user.problemsSolved || 0} bài
                  </span>
                </div>
                <div className="us-result-rank">
                  <img src={getRankImage(user.rank)} alt={user.rank} className="us-rank-img" />
                  <span className="us-rank-text" style={{ color: RANK_COLORS[user.rank] }}>
                    {user.rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && query && results.length === 0 && !loading && (
        <div className="us-dropdown">
          <div className="us-no-result">Không tìm thấy người dùng nào</div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
