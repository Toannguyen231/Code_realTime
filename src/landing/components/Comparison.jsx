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
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">05 so sánh</p>
          <h2>Codexa đứng ở đâu?</h2>
          <p>So với các công cụ cộng tác và luyện tập phổ biến khác.</p>
        </div>
        <div className="cmp-wrap reveal">
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
                <tr key={ri}>
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
