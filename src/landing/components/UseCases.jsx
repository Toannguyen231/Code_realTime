import { useRef, useEffect, useState } from 'react';

const USERS = [
  {
    icon: '👨‍💻',
    title: 'Lập trình viên',
    items: ['Pair programming không cần share màn hình', 'Review code có thảo luận real-time', 'Phỏng vấn kỹ thuật từ xa'],
  },
  {
    icon: '🏫',
    title: 'Giảng viên / gia sư',
    items: ['Dạy lập trình trực tiếp, tương tác', 'Chấm bài tự động với AI', 'Theo dõi tiến độ sinh viên'],
  },
  {
    icon: '💼',
    title: 'Nhóm/công ty',
    items: ['Coding session cho team phân tán', 'Phỏng vấn nhanh, khách quan', 'Chuyển giao kiến thức nội bộ'],
  },
  {
    icon: '🎯',
    title: 'Thi đấu lập trình',
    items: ['Luyện tập nhóm trước contest', 'Đánh giá bằng test case ẩn', 'Bứt tốc qua bảng xếp hạng'],
  },
];

function UseCaseCard({ useCase, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="uc-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s var(--ease-out-expo) ${index * 80}ms`,
      }}
    >
      <h4>{useCase.icon} {useCase.title}</h4>
      <ul>
        {useCase.items.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default function UseCases() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">06 dùng cho ai</p>
          <h2>Bốn nhóm người dùng chính</h2>
        </div>
        <div className="uc-grid">
          {USERS.map((u, i) => (
            <UseCaseCard key={u.title} useCase={u} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
