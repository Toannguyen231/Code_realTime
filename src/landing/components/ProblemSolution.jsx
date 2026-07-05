import { useRef, useEffect, useState } from 'react';

function CsCard({ children, type, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 200);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={ref} className={'ps-card ' + type + (visible ? ' in' : '')}>
      {children}
    </div>
  );
}

export default function ProblemSolution() {
  return (
    <section className="section" id="problem">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">01 vấn đề & giải pháp</p>
          <h2>Vì sao lại cần Codexa?</h2>
          <p>Cách các nhóm dev hiện code cùng nhau vẫn còn rất nhiều ma sát — Codexa gom hết vào một tab trình duyệt.</p>
        </div>
        <div className="ps-grid">
          <CsCard type="problem" index={0}>
            <h3>⚠ Vấn đề hiện tại</h3>
            <ul>
              <li>Share màn hình bị lag, không ai gõ được cùng lúc</li>
              <li>Code theo lượt (turn-based) làm chậm cả nhóm</li>
              <li>Setup môi trường dev tốn hàng giờ mỗi lần</li>
              <li>Pair programming từ xa cảm giác rời rạc, thiếu kết nối</li>
              <li>Test code phải nhảy qua lại nhiều công cụ khác nhau</li>
            </ul>
          </CsCard>
          <CsCard type="solution" index={1}>
            <h3>✓ Cách Codexa giải quyết</h3>
            <ul>
              <li>Đồng bộ real-time từng phím gõ, không có "lượt"</li>
              <li>Chạy code 7 ngôn ngữ ngay trong trình duyệt, không cần cài gì</li>
              <li>AI (Gemini 2.5) giải thích, sửa lỗi, tối ưu ngay khi cần</li>
              <li>Test case ẩn tự sinh — luyện tập sát với thi đấu thật</li>
              <li>Chat tích hợp sẵn, không cần mở thêm Discord/Slack</li>
            </ul>
          </CsCard>
        </div>
      </div>
    </section>
  );
}
