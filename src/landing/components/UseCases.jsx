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
            <div key={u.title} className={'uc-card reveal reveal-delay-' + ((i % 4) + 1)}>
              <h4>{u.icon} {u.title}</h4>
              <ul>
                {u.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
