import React, { useEffect } from 'react';
import './Achievements.scss';

const AchievementToast = ({ achievements = [], onClose }) => {
  useEffect(() => {
    if (!achievements.length) return undefined;
    const timer = setTimeout(() => onClose?.(), 7000);
    return () => clearTimeout(timer);
  }, [achievements, onClose]);

  if (!achievements.length) return null;

  return (
    <div className="achievement-toast-wrap">
      {achievements.map((achievement) => (
        <div key={achievement.id} className={`achievement-toast rarity-${achievement.rarity}`}>
          <div className="achievement-toast-icon">{achievement.icon}</div>
          <div>
            <div className="achievement-toast-kicker">🏅 Mở khóa huy hiệu</div>
            <div className="achievement-toast-title">{achievement.title}</div>
            <div className="achievement-toast-desc">{achievement.description}</div>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng">×</button>
        </div>
      ))}
    </div>
  );
};

export default AchievementToast;
