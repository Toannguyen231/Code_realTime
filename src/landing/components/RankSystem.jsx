const RANKS = [
  { emblem: '👑', bg: 'linear-gradient(135deg,#fff6d8,#e0b23a)', name: 'Thách Đấu', en: 'Master', points: '12.001+ điểm' },
  { emblem: '💎', bg: 'linear-gradient(135deg,#dff4f2,#7fd9cf)', name: 'Kim Cương', en: 'Diamond', points: '8.001 – 12.000' },
  { emblem: '💜', bg: 'linear-gradient(135deg,#eadcff,#b48af0)', name: 'Tinh Anh', en: 'Platinum', points: '5.001 – 8.000' },
  { emblem: '🥇', bg: 'linear-gradient(135deg,#fff2cf,#f0c150)', name: 'Vàng', en: 'Gold', points: '3.001 – 5.000' },
  { emblem: '🥈', bg: 'linear-gradient(135deg,#e9edf2,#b9c3cf)', name: 'Bạc', en: 'Silver', points: '1.501 – 3.000' },
  { emblem: '🥉', bg: 'linear-gradient(135deg,#f4ddc9,#c98652)', name: 'Đồng', en: 'Bronze', points: '501 – 1.500' },
  { emblem: '⚔️', bg: 'linear-gradient(135deg,#d9dde2,#8f98a3)', name: 'Sắt', en: 'Iron', points: '0 – 500' },
];

export default function RankSystem() {
  return (
    <section className="section" id="rank">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow amber">04 hệ thống rank</p>
          <h2>7 bậc thi đấu, điểm không bao giờ giảm</h2>
          <p>Easy = 50 điểm · Medium = 100 điểm · Hard = 200 điểm. Điểm chỉ cộng dồn khi bài được chấm Accepted, không trừ khi nộp sai.</p>
        </div>
        <div className="rank-list">
          {RANKS.map((r, i) => (
            <div key={r.name} className={'rank-row reveal reveal-delay-' + ((i % 5) + 1)}>
              <div className="rank-emblem" style={{ background: r.bg }}>{r.emblem}</div>
              <div className="rank-name">{r.name} <span>{r.en}</span></div>
              <div className="rank-points">{r.points}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
