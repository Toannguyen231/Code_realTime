# 🚀 Roadmap Phát triển: Real-time Collaborative Code Editor

Dự án này là một nền tảng lập trình trực tuyến cho phép 2 (hoặc nhiều) người cùng code trong thời gian thực (real-time) và chạy mã để xem kết quả. Hiện tại, bạn đã hoàn thiện tính năng quan trọng nhất: **Giao diện Editor và Chạy code ra Output**. 

Dưới đây là một lộ trình (Roadmap) chi tiết từng bước để giúp bạn hoàn thiện hệ thống Real-Time.

---

## 🎯 Phase 1: Hoàn thiện Backend và Cơ sở hạ tầng thời gian thực (WebSockets)
**Mục tiêu:** Xây dựng một máy chủ (Server) để quản lý kết nối giữa các người tham gia.

*   [ ] **Khởi tạo Backend Server:** Tạo một thư mục riêng (ví dụ `server`) và cài đặt `Node.js` cùng `Express`.
*   [ ] **Cài đặt WebSockets:** Tích hợp `Socket.io` vào server Node.js. Đây là thư viện phổ biến và tốt nhất để làm ứng dụng real-time.
*   [ ] **Cơ chế Room (Phòng):** 
    *   Tạo logic trên server cho phép người dùng tham gia (Join) vào một phòng bằng một `Room ID` nhất định.
    *   Khi người dùng kết nối qua client (`App.jsx`), họ sẽ truyền một `Room ID` lên server.
*   [ ] **Theo dõi người tham gia (Presence):** Server cần thông báo khi có một user tham gia mới (Join) hoặc rời đi (Disconnect) cho những user khác trong phòng.

---

## 🎯 Phase 2: Đồng bộ hóa Monaco Editor (Real-time Code Sync)
**Mục tiêu:** Cả 2 người cùng nhìn thấy thao tác gõ phím của nhau ngay lập tức (như Google Docs).

*   **Phương pháp 1 (Dễ nhất - Broadcasting):**
    *   Sử dụng sự kiện `onChange` của Monaco Editor.
    *   Gửi toàn bộ nội dung code hiện tại qua `socket.emit('code-change', code)` lên server.
    *   Server phát (broadcast) đoạn code đó tới người dùng còn lại `socket.broadcast.to(roomId).emit('code-sync', code)`.
    *   *Nhược điểm:* Khi 2 người gõ cùng lúc có thể xảy ra xung đột nội dung.
*   **Phương pháp 2 (Chuyên nghiệp - Recommended): Sử dụng thuật toán CRDT (Yjs)**
    *   [ ] Cài đặt `yjs`, `y-websocket`, và module kết nối là `y-monaco` trên Client.
    *   [ ] Khi khởi tạo Monaco Editor (trong hook `onMount`), cấu hình Yjs Provider để kết nối Yjs với WebSocket server (hoặc dùng WebRTC local).
    *   [ ] Giải pháp này tự động xử lý xung đột nội dung siêu mượt mà kể cả khi 2 người gõ trên đúng 1 dòng.
    *   [ ] Hiển thị con trỏ chuột (Cursor & Selection) của người kia với tên của họ.

---

## 🎯 Phase 3: Đồng bộ trạng thái và Output
**Mục tiêu:** Khi 1 người thao tác thay đổi điều gì đó khác (Language, Run Code), người kia cũng cập nhật theo.

*   [ ] **Đồng bộ ngôn ngữ lập trình (Language Selection):** Khi User A chọn đổi sang Python, gửi socket event. User B cũng tự động nhảy UI qua tab Python.
*   [ ] **Đồng bộ trạng thái chạy code (Loading State):** Khi User A bấm Run, User B cũng sẽ thấy nút Run chuyển sang trạng thái "Đang chạy..." (`isRunning = true`).
*   [ ] **Đồng bộ Output Panel:** 
    *   Thực tế, cả 2 người KHÔNG cần phải gọi API cùng lúc (tránh tốn giới hạn request API từ Judge0).
    *   Chỉ có người ra lệnh (User A) gửi mã lên mạng để chạy. 
    *   Khi có kết quả (Stdout/Stderr), User A sẽ thông qua WebSocket đẩy Output đó cho User B.
    *   Cả hai màn hình đều in ra chung một kết quả chạy.

---

## 🎯 Phase 4: Quản lý người dùng, Giao lưu (Side-features)
**Mục tiêu:** Nâng cấp trải nghiệm phòng họp code.

*   [ ] **Tham gia phòng với Tên hiển thị:** Tạo một modal trước khi vào phòng yêu cầu nhập "Room ID" và "Tên người dùng".
*   [ ] **Danh sách người trong phòng (Sidebar):** Thay vì giao diện mặc định, Sidebar sẽ dùng để hiển thị các User đang Online trong phòng này (ví dụ: avatar, icon green dot chấm xanh online).
*   [ ] *(Tùy chọn)* **Chat Panel:** Một hộp thoại chat nhỏ ở góc dưới hoặc tích hợp chung vào Sidebar để trao đổi nhanh thay vì voice call.

---

## 🎯 Phase 5: Tối ưu và Hoàn thiện (Deploy)
**Mục tiêu:** Đưa dự án lên môi trường live để bạn bè có thể vào dùng.

*   [ ] Xóa bỏ các thư viện hoặc code chết, cấu trúc lại thư mục Backend/Frontend chung một Repo.
*   [ ] Chặn mã độc: Rà soát lại việc thực thi JS (`new Function`). Xóa bỏ logic thực thi mã cục bộ, chỉ giao hoàn toàn cho API như Judge0.
*   [ ] Deploy Frontend lên **Vercel / Netlify / Render**.
*   [ ] Deploy Backend (`Socket.io Node server`) lên **Render / Railway / Fly.io**.

---
## ✨ Bạn muốn bắt đầu từ đâu trước?
Tôi đề xuất chúng ta sẽ bắt đầu làm **Phase 1: Thiết lập Node.js + Socket.io Server** ngay. Bạn định tạo thư mục backend ở trong repo hiện tại luôn hay tạo thành 1 project mới riêng biệt?
