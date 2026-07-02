import React, { useEffect, useState } from 'react';
import API from '../../api';
import './Achievements.scss';

const AchievementsPanel = () => {
  const [snapshot, setSnapshot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/achievements/me');
      setSnapshot(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Không tải được huy hiệu');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      const { data } = await API.post('/achievements/check');
      setSnapshot(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Không cập nhật được huy hiệu');
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  if (loading) {
    return <section className="achievements-panel"><h2>🏅 Huy hiệu</h2><p>Đang tải huy hiệu...</p></section>;
  }

  return (
    <section className="achievements-panel">
      <div className="achievements-header">
        <div>
          <h2>🏅 Huy hiệu</h2>
          {snapshot && <p>{snapshot.unlockedCount}/{snapshot.total} đã mở khóa</p>}
        </div>
        <button type="button" onClick={refresh}>Cập nhật</button>
      </div>

      {error && <div className="achievements-error">{error}</div>}

      <div className="achievements-grid">
        {snapshot?.achievements?.map((achievement) => (
          <article
            key={achievement.id}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} rarity-${achievement.rarity}`}
          >
            <div className="achievement-icon">{achievement.unlocked ? achievement.icon : '🔒'}</div>
            <div className="achievement-content">
              <div className="achievement-topline">
                <h3>{achievement.title}</h3>
                <span>{achievement.rarity}</span>
              </div>
              <p>{achievement.description}</p>
              <div className="achievement-progress-row">
                <span>{achievement.progressRaw || 0}/{achievement.target}</span>
                {achievement.unlockedAt && (
                  <time>{new Date(achievement.unlockedAt).toLocaleDateString('vi-VN')}</time>
                )}
              </div>
              <div className="achievement-progress">
                <div style={{ width: `${achievement.percent || 0}%` }} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AchievementsPanel;
