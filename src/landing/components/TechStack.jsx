const STACK = [
  'React 19', 'Vite 8', 'Monaco Editor', 'Socket.IO',
  'Node.js + Express 5', 'MongoDB Atlas', 'Google Gemini 2.5',
  'JWT + bcrypt', 'Docker', 'Vercel · Railway',
];

export default function TechStack() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">07 công nghệ</p>
          <h2>Xây trên nền tảng hiện đại</h2>
          <p>Cho ai muốn xem code, đóng góp, hoặc tự deploy phiên bản của riêng mình.</p>
        </div>
        <div className="stack-row reveal">
          {STACK.map(s => (
            <span key={s} className="stack-pill">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
