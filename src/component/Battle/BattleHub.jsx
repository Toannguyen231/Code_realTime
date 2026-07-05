import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiSend, FiClock, FiUserPlus, FiTrendingUp, FiRefreshCw, FiChevronRight, FiCrosshair, FiCheck } from 'react-icons/fi';
import API from '../../api';
import Avatar from '../Avatar/Avatar.jsx';
import { getRankImage } from '../../utils/rankImages';
import '../Avatar/Avatar.scss';
import './BattleHub.scss';

const RANK_COLORS = {
  'Sắt': '#A0AEC0',
  'Đồng': '#B45309',
  'Bạc': '#BFDBFE',
  'Vàng': '#FCD34D',
  'Tinh Anh': '#A78BFA',
  'Kim Cương': '#06B6D4',
  'Thách Đấu': '#FF6B6B',
};

const BattleHub = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ battleStats: {}, rank: 'Sắt', totalPoints: 0 });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [challengeUsername, setChallengeUsername] = useState('');
  const [challengeResult, setChallengeResult] = useState(null);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [challengeError, setChallengeError] = useState('');

  // ── Load stats & history ──
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          API.get('battle/stats'),
          API.get('battle/history', { params: { limit: '10' } }),
        ]);
        setStats(statsRes.data);
        setHistory(historyRes.data.items || []);
      } catch (err) {
        console.error('[BattleHub] Failed to load:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Challenge ──
  const handleChallenge = useCallback(async () => {
    if (!challengeUsername.trim()) return;
    setChallengeLoading(true);
    setChallengeError('');
    setChallengeResult(null);

    try {
      const { data } = await API.post('battle/invite', { username: challengeUsername.trim() });
      setChallengeResult(data);
    } catch (err) {
      setChallengeError(err.message);
    } finally {
      setChallengeLoading(false);
    }
  }, [challengeUsername]);

  const { battleStats } = stats;
  const winRate = battleStats.totalBattles > 0
    ? Math.round((battleStats.wins / battleStats.totalBattles) * 100)
    : 0;


  return (
    <div className="battle-hub">
      {/* ── Header ── */}
      <div className="battle-header">
        <div className="battle-header-left">
          <FiCrosshair className="battle-header-icon" />
          <div>
            <h1>Đấu Trường</h1>
            <p className="battle-subtitle">Code Battle 1v1</p>
          </div>
        </div>
        <button className="back-btn" onClick={() => navigate('/rooms')}>
          ← Quay lại
        </button>
      </div>

      {/* ── Rank Hero ── */}
      <div className="rank-hero">
        <div className="rank-badge">
          <img src={getRankImage(stats.rank)} alt={stats.rank} className="rank-image" />
        </div>
        <div className="rank-info">
          <div className="eyebrow">Hạng hiện tại</div>
          <h2 style={{ color: RANK_COLORS[stats.rank] || '#A0AEC0' }}>{stats.rank}</h2>
          <div className="rank-progress">
            <div className="track"><div className="fill" style={{ width: '12%' }}></div></div>
            <span>120 / 1000 XP</span>
          </div>
        </div>
        <div className="stat-strip">
          <div className="stat">
            <div className="label"><FiCrosshair className="ic" /> Số trận</div>
            <div className="value">{battleStats.totalBattles || 0}</div>
          </div>
          <div className="stat win">
            <div className="label"><FiCheck className="ic" /> Thắng</div>
            <div className="value">{battleStats.wins || 0}</div>
          </div>
          <div className="stat rate">
            <div className="label"><FiTrendingUp className="ic" /> Win rate</div>
            <div className="value">{winRate}%</div>
          </div>
          <div className="stat streak">
            <div className="label"><FiZap className="ic" /> Streak</div>
            <div className="value">{battleStats.currentStreak || 0}</div>
          </div>
        </div>
      </div>

      {/* ── Main Actions (Action Zone) ── */}
      <div className="action-zone" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '80px', marginBottom: '80px' }}>
        <div className="card card-quick" role="button" tabIndex="0" onClick={() => navigate('/battle/queue')}>
          <div className="photo-layer"></div>
          <div className="scrim"></div>
          <div className="content">
            <div className="radar">
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="sweep"></div>
              <div className="core"><FiZap className="ic" /></div>
            </div>
            <div className="copy">
              <div className="eyebrow">Ghép trận nhanh</div>
              <h3>Đấu Ngay</h3>
              <p>Tìm đối thủ ngẫu nhiên, cân bằng theo hạng của bạn</p>
            </div>
            <div className="go"><FiChevronRight className="ic" /></div>
          </div>
        </div>

        <div className="card card-challenge">
          <div className="eyebrow">Thách đấu trực tiếp</div>
          <h3 style={{ textShadow: '0 0 10px #FF6B6B, 0 0 20px #FF6B6B', color: '#FF6B6B' }}>Thách Đấu</h3>
          <p>Gửi lời mời đến một lập trình viên cụ thể</p>
          <div className="challenge-form">
            <div className="input-wrap">
              <FiUserPlus className="ic" />
              <input
                type="text"
                placeholder="Nhập tên đối thủ..."
                value={challengeUsername}
                onChange={(e) => setChallengeUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChallenge()}
              />
            </div>
            <button
              onClick={handleChallenge}
              disabled={challengeLoading || !challengeUsername.trim()}
            >
              {challengeLoading ? '...' : <><FiSend className="ic" /> Thách Đấu</>}
            </button>
          </div>

          {/* Challenge Result */}
          {challengeResult && (
            <div className="challenge-result">
              <div className="challenge-players">
                <div className="challenge-player">
                  <Avatar username={challengeResult.me.username} />
                  <span className="challenge-name">{challengeResult.me.username}</span>
                </div>
                <span className="challenge-vs">⚔️ VS</span>
                <div className="challenge-player">
                  <Avatar username={challengeResult.opponent.username} />
                  <span className="challenge-name">{challengeResult.opponent.username}</span>
                </div>
              </div>
              <p className="challenge-hint">Đã tìm thấy! Lời mời đã được gửi đi.</p>
            </div>
          )}
          {challengeError && <p className="challenge-error">{challengeError}</p>}
        </div>
      </div>

      {/* ── History ── */}
      <div className="history">
        <div className="history-head">
          <h3><FiClock className="ic" /> Lịch Sử Battle</h3>
          {history.length > 0 && (
            <button className="demo-toggle" onClick={() => navigate('/battle')}>
              Xem tất cả <FiChevronRight />
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner">Đang tải...</div>
        ) : history.length === 0 ? (
          <div id="emptyState" className="empty-state">
            <div className="empty-radar">
              <div className="ring d1"></div>
              <div className="ring d2"></div>
              <div className="ring d3"></div>
              <FiCrosshair className="ic" />
            </div>
            <h4>Chưa có trận battle nào</h4>
            <p>Hãy tham gia đấu ngay để bắt đầu hành trình của bạn tại Đấu Trường</p>
          </div>
        ) : (
          <div id="matchList" className="match-list">
            {history.map((item) => {
              const tagClass = item.result === 'win' ? 'win' : item.result === 'lose' ? 'lose' : 'draw';
              const tagText = item.result === 'win' ? 'THẮNG' : item.result === 'lose' ? 'THUA' : 'HOÀ';
              return (
                <div key={item.id} className="match-row" onClick={() => navigate(`/battle/${item.roomId}`)}>
                  <div className={`match-result ${tagClass}`}></div>
                  <div className="match-opp">
                    <div className="name">{item.opponent.username}</div>
                    <div className="meta">{item.opponent.rank} · {item.problem.difficulty}</div>
                  </div>
                  <div className="match-score">{item.myScore} — {item.opponentScore}</div>
                  <div className={`match-tag ${tagClass}`}>{tagText}</div>
                  <div className="match-time">{item.problem.contestId}{item.problem.index}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleHub;



















