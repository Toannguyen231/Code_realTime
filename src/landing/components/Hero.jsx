import { Link } from 'react-router-dom';
import CodeWindow from './CodeWindow';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="badge"><span className="pulse" /> Đang phát triển tích cực · Miễn phí & mã nguồn mở</div>
          <h1>Code cùng nhau,<br />không còn <span className="hl">chờ đến lượt</span>.</h1>
          <p className="desc" id="tagline">
            Codexa là nền tảng lập trình cộng tác thời gian thực kết hợp thi đấu kiểu LeetCode:
            mọi thao tác gõ phím đồng bộ dưới 50ms, AI chấm và giải thích lỗi ngay trong bài,
            và một hệ thống rank 7 bậc để bạn thấy mình tiến bộ mỗi ngày.
          </p>
          <div className="cta-group">
            <Link className="btn btn-primary btn-lg" to="/login">
              Mở phòng code ngay →
            </Link>
            <a className="btn btn-ghost btn-lg" href="#features">Xem tính năng</a>
          </div>
          <div className="stat-row">
            <div className="stat"><b>7</b><span>ngôn ngữ hỗ trợ</span></div>
            <div className="stat"><b>&lt;50ms</b><span>độ trễ đồng bộ</span></div>
            <div className="stat"><b>7</b><span>bậc rank thi đấu</span></div>
            <div className="stat"><b>50</b><span>người / phòng</span></div>
          </div>
        </div>
        <CodeWindow />
      </div>
    </section>
  );
}
