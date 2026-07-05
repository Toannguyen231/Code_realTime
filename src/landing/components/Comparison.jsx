import { useRef, useEffect, useState } from 'react';

const ROWS = [
  ['Đồng bộ real-time', '✓', '✓', '✓', '✓'],
  ['Chạy nhiều ngôn ngữ', '✓', '✕', '✓', '✓'],
  ['Trợ lý AI', '✓', '✕', '✓', '✕'],
  ['Hệ thống rank / gamification', '✓', '✕', '✓', '✓'],
  ['Bảng xếp hạng', '✓', '✕', '✓', '✓'],
  ['Chi phí', 'Miễn phí', 'Miễn phí', '7–29 $/tháng', '150+ $/tháng'],
  ['Độ trễ đồng bộ', '<50ms', '<100ms', '~200ms', '~500ms'],
  ['Không cần cài đặt', '✓', '✕', '✓', '✓'],
  ['Mã nguồn mở', '✓', '✕', '✕', '✕'],
];

const HEADS = ['Tính năng', 'Codexa', 'VSCode LiveShare', 'Replit', 'HackerRank'];

function cellValue(val) {
  if (val === '✓') return <span className="yes">✓</span>;
  if (val === '✕') return <span className="no">✕</span>;
  return val;
}

export default function Comparison() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">05 so sánh</p>
          <h2>Codexa đứng ở đâu?</h2>
          <p>So với các công cụ cộng tác và luyện tập phổ biến khác.</p>
        </div>
        <div className="cmp-wrap" ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s var(--ease-out-expo)' }}>
          <table className="cmp">
            <thead>
              <tr>
                {HEADS.map((h, i) => (
                  <th key={h} className={i <= 1 ? 'hl' : ''}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: `opacity 0.4s ease ${ri * 60}ms, transform 0.4s var(--ease-out-expo) ${ri * 60}ms`,
                  }}
                >
                  {row.map((val, ci) => (
                    <td key={ci} className={ci === 1 ? 'hl' : ''}>{cellValue(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
