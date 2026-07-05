import { useRef, useEffect, useState } from 'react';

const STACK = [
  'React 19', 'Vite 8', 'Monaco Editor', 'Socket.IO',
  'Node.js + Express 5', 'MongoDB Atlas', 'Google Gemini 2.5',
  'JWT + bcrypt', 'Docker', 'Vercel · Railway',
];

function StackPill({ name, index, visible }) {
  return (
    <span
      className="stack-pill"
      style={{
        transitionDelay: `${index * 60}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        transition: 'opacity 0.4s ease, transform 0.4s var(--ease-out-expo)',
      }}
    >
      {name}
    </span>
  );
}

export default function TechStack() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">07 công nghệ</p>
          <h2>Xây trên nền tảng hiện đại</h2>
          <p>Cho ai muốn xem code, đóng góp, hoặc tự deploy phiên bản của riêng mình.</p>
        </div>
        <div className="stack-row" ref={ref}>
          {STACK.map((s, i) => (
            <StackPill key={s} name={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
