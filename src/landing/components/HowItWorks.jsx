import { useState, useEffect, useRef } from 'react';

const COLLAB_STEPS = [
  { num: '01', title: 'Đăng ký / đăng nhập', desc: 'Bằng email hoặc Google, miễn phí và nhanh gọn.', icon: '🔑' },
  { num: '02', title: 'Tạo phòng', desc: 'Bấm "Create Room", chọn ngôn ngữ và theme editor.', icon: '🛠️' },
  { num: '03', title: 'Mời đồng đội', desc: 'Gửi link phòng — có thể đặt mật khẩu bảo vệ.', icon: '📨' },
  { num: '04', title: 'Code cùng lúc', desc: 'Gõ, chạy, chat — tất cả đồng bộ trong thời gian thực.', icon: '⚡' },
];

const SOLO_STEPS = [
  { num: '01', title: 'Chọn độ khó', desc: 'Duyệt bài tại /problems, lọc theo Easy / Medium / Hard.', icon: '🎯' },
  { num: '02', title: 'Viết & chạy thử', desc: 'Test với sample case, xem output ngay trong Monaco Editor.', icon: '✍️' },
  { num: '03', title: 'Nộp bài', desc: 'Chấm với test case ẩn — chỉ AC mới được tính điểm.', icon: '📤' },
  { num: '04', title: 'Leo hạng', desc: 'Điểm cộng dồn, xem vị trí ngay trên bảng xếp hạng toàn cầu.', icon: '🏆' },
];

const TABS = [
  { key: 'collab', label: '🔄 Phòng cộng tác' },
  { key: 'solo', label: '🏆 Luyện tập & leo rank' },
];

function StepCard({ step, index, isActive }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !isActive) return;
    // Sequential reveal
    const timer = setTimeout(() => {
      ref.current?.classList.add('in');
    }, index * 120);
    return () => clearTimeout(timer);
  }, [index, isActive]);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="step reveal" data-reveal-delay={index * 80}>
      <div className="step-icon">{step.icon}</div>
      <div className="stepnum">{step.num}</div>
      <h4>{step.title}</h4>
      <p>{step.desc}</p>
      {index < 3 && <div className="step-connector" />}
    </div>
  );
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('collab');
  const [animating, setAnimating] = useState(false);

  function handleTabChange(key) {
    if (key === activeTab || animating) return;
    setAnimating(true);
    setActiveTab(key);
    setTimeout(() => setAnimating(false), 400);
  }

  const steps = activeTab === 'collab' ? COLLAB_STEPS : SOLO_STEPS;

  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">03 cách hoạt động</p>
          <h2>Hai hướng dùng chính</h2>
          <p>Vào phòng cộng tác với đồng đội, hoặc luyện tập một mình để leo rank — cả hai đều bắt đầu từ cùng một tài khoản.</p>
        </div>
        <div className="flow-tabs reveal">
          {TABS.map(t => (
            <button
              key={t.key}
              className={'flow-tab' + (activeTab === t.key ? ' active' : '')}
              onClick={() => handleTabChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={'flow-panel active' + (animating ? ' fading' : '')}>
          <div className="steps">
            {steps.map((s, i) => (
              <StepCard key={s.num} step={s} index={i} isActive={!animating} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
