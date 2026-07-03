const ICONS = {
  sync: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  languages: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  ai: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z" /></svg>,
  test: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  rank: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a5 5 0 0 0 5-5V4H7v6a5 5 0 0 0 5 5zM8 21h8M9 21v-2.5a3 3 0 0 1 6 0V21" /></svg>,
  history: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  editor: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v12H7l-3 3z" /></svg>,
  chat: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
  shield: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
};

const FEATURES = [
  { icon: 'sync', title: 'Đồng bộ real-time', desc: 'Từng phím gõ hiển thị ngay trên máy đồng đội, độ trễ dưới 50ms. Thấy con trỏ từng người đang code ở đâu, như một tài liệu sống.' },
  { icon: 'languages', title: '7 ngôn ngữ, không cần setup', desc: 'C++, Python, Java, JavaScript, TypeScript, C#, PHP — viết và chạy ngay, không Docker, không biến môi trường.' },
  { icon: 'ai', title: 'AI Assistant — Gemini 2.5', desc: 'Bôi đen đoạn code bất kỳ và hỏi AI: giải thích, sửa bug, tối ưu, hoặc trò chuyện về toàn bộ codebase.', amber: true },
  { icon: 'test', title: 'Test case thông minh', desc: 'AI tự sinh test case ẩn cho bài luyện tập, cache kết quả nhanh hơn 10x ở lần chạy sau, tự chuyển key khi hết quota.', amber: true },
  { icon: 'rank', title: 'Rank thi đấu 7 bậc', desc: 'Từ Sắt đến Thách Đấu — bảng xếp hạng toàn cầu cập nhật ngay sau mỗi lần AC, thống kê cá nhân theo độ khó.', amber: true },
  { icon: 'history', title: 'Lưu phiên bản tự động', desc: 'Tối đa 20 snapshot mỗi phiên, khôi phục bất kỳ bản nào ngay lập tức — version control nhẹ nhàng, không cần học Git.' },
  { icon: 'editor', title: 'Editor chuyên nghiệp', desc: 'Monaco Editor — cùng engine với VS Code. 5+ theme, IntelliSense, minimap, syntax highlight đầy đủ.' },
  { icon: 'chat', title: 'Chat tích hợp', desc: 'Trao đổi ngay trong sidebar khi đang code, không cần chuyển qua lại giữa Discord, Slack và editor.' },
  { icon: 'shield', title: 'Bảo mật doanh nghiệp', desc: 'JWT + bcrypt (12 salt round), phòng có mật khẩu, WebSocket mã hoá, rate limit chống DDoS.' },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">02 tính năng</p>
          <h2>Mọi công cụ nằm trong một tab</h2>
          <p>Từ soạn thảo đến chấm điểm, leo hạng — không phải ghép nhiều dịch vụ rời rạc lại với nhau.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={'feature-card reveal reveal-delay-' + ((i % 5) + 1) + (f.amber ? ' amber' : '')}>
              <div className="ficon">{ICONS[f.icon]}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
