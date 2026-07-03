import { useState } from 'react';

const COLLAB_STEPS = [
  { num: '01', title: 'Đăng ký / đăng nhập', desc: 'Bằng email hoặc Google, miễn phí và nhanh gọn.' },
  { num: '02', title: 'Tạo phòng', desc: 'Bấm "Create Room", chọn ngôn ngữ và theme editor.' },
  { num: '03', title: 'Mời đồng đội', desc: 'Gửi link phòng — có thể đặt mật khẩu bảo vệ.' },
  { num: '04', title: 'Code cùng lúc', desc: 'Gõ, chạy, chat — tất cả đồng bộ trong thời gian thực.' },
];

const SOLO_STEPS = [
  { num: '01', title: 'Chọn độ khó', desc: 'Duyệt bài tại /problems, lọc theo Easy / Medium / Hard.' },
  { num: '02', title: 'Viết & chạy thử', desc: 'Test với sample case, xem output ngay trong Monaco Editor.' },
  { num: '03', title: 'Nộp bài', desc: 'Chấm với test case ẩn — chỉ AC mới được tính điểm.' },
  { num: '04', title: 'Leo hạng', desc: 'Điểm cộng dồn, xem vị trí ngay trên bảng xếp hạng toàn cầu.' },
];

const TABS = [
  { key: 'collab', label: '🔄 Phòng cộng tác' },
  { key: 'solo', label: '🏆 Luyện tập & leo rank' },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('collab');

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
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={'flow-panel active reveal'} data-panel={activeTab}>
          <div className="steps">
            {(activeTab === 'collab' ? COLLAB_STEPS : SOLO_STEPS).map((s, i) => (
              <div key={s.num} className={'step reveal reveal-delay-' + ((i % 4) + 1)}>
                <div className="stepnum">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
