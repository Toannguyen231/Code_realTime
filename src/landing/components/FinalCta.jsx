import { Link } from 'react-router-dom';

export default function FinalCta() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="final-cta reveal">
          <p className="eyebrow" style={{ justifyContent: 'center' }}>sẵn sàng chưa</p>
          <h2>Tạo phòng. Gửi link. Bắt đầu code.</h2>
          <p>Không cần tải app, không cần cấu hình — mở trình duyệt và code cùng nhau ngay.</p>
          <div className="cta-group" style={{ justifyContent: 'center' }}>
            <Link className="btn btn-primary btn-lg" to="/login">
              Mở Codexa ngay →
            </Link>
            <a
              className="btn btn-ghost btn-lg"
              href="https://github.com/Toannguyen231/Codexa"
              target="_blank"
              rel="noopener"
            >
              Xem mã nguồn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
