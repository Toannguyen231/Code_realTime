export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div
          className="logo"
          style={{
            fontSize: '1rem',
            background: 'linear-gradient(135deg, var(--cyan), var(--amber))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          &lt;Codexa/&gt;
        </div>
        <div className="footer-links">
          <a href="https://github.com/Toannguyen231/Codexa" target="_blank" rel="noopener">GitHub</a>
          <a href="https://github.com/Toannguyen231/Codexa/blob/main/README.md" target="_blank" rel="noopener">Tài liệu</a>
          <a href="https://github.com/Toannguyen231/Codexa/issues" target="_blank" rel="noopener">Báo lỗi</a>
          <a href="https://github.com/Toannguyen231/Codexa/blob/main/LICENSE" target="_blank" rel="noopener">Giấy phép MIT</a>
        </div>
        <div className="footer-note">© 2026 Codexa — built by a student, in the open.</div>
      </div>
    </footer>
  );
}
