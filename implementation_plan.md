# Redesign UI Component Structure (LeetCode Clone)

Theo yêu cầu của bạn, chúng ta sẽ thiết kế lại giao diện của ứng dụng cho giống với hình ảnh (tương tự như giao diện của LeetCode) và chia các component một cách hợp lý để dễ dàng đổ dữ liệu vào sau này.

## Phân tích giao diện từ ảnh
Giao diện được chia làm 3 phần chính:
1. **Navbar (Thanh điều hướng trên cùng):** Chứa logo, danh sách bài tập, nút Run/Submit, cài đặt, đăng ký/đăng nhập.
2. **Left Pane (Cột trái - Mô tả bài tập):** Chứa các tab (Description, Editorial, Solutions, Submissions), nội dung chi tiết bài tập.
3. **Right Pane (Cột phải - Code & Console):**
   - **Phần trên (Code Editor):** Nơi để viết code, có chọn ngôn ngữ, nút reset.
   - **Phần dưới (Console/Test Result):** Nơi hiển thị testcase và kết quả chạy code.

## Đề xuất chia Component

Chúng ta sẽ cấu trúc lại thư mục `src/component` như sau:

### 1. Phân chia thư mục:
```text
src/
 ┣ component/
 ┃ ┣ Navbar/
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┗ Navbar.scss
 ┃ ┣ Workspace/
 ┃ ┃ ┣ Workspace.jsx        (Container chính bọc Left Pane & Right Pane)
 ┃ ┃ ┗ Workspace.scss
 ┃ ┣ ProblemDescription/    (Left Pane)
 ┃ ┃ ┣ ProblemDescription.jsx
 ┃ ┃ ┗ ProblemDescription.scss
 ┃ ┣ CodeArea/              (Right Pane)
 ┃ ┃ ┣ CodeArea.jsx         (Bọc Editor và Console)
 ┃ ┃ ┣ CodeArea.scss
 ┃ ┃ ┣ CodeEditorPanel.jsx  (Khu vực viết code)
 ┃ ┃ ┗ ConsolePanel.jsx     (Khu vực Testcase / Output)
 ┃ ┗ UI/                    (Các component dùng chung nhỏ hơn nếu cần)
 ┣ App.jsx
 ┗ index.css
```

## User Review Required
> [!IMPORTANT]
> Bạn có đồng ý với cách chia thư mục và component này không? Chúng ta sẽ không sử dụng thêm thư viện chia màn hình (mặc định sẽ dùng CSS Flexbox để chia layout 50-50, có thể kéo thả sau nếu cần). Nếu bạn đồng ý, mình sẽ tiến hành tạo code cho từng component.
  
## Proposed Changes

### Thay đổi Cấu trúc (Component)

#### [NEW] `src/component/Navbar/Navbar.jsx`
Thanh điều hướng phía trên cùng.

#### [NEW] `src/component/Workspace/Workspace.jsx`
Component cha sẽ chứa `ProblemDescription` bên trái và `CodeArea` bên phải.

#### [NEW] `src/component/ProblemDescription/ProblemDescription.jsx`
Khu vực hiển thị đề bài, các tab (Description, Editorial...).

#### [NEW] `src/component/CodeArea/CodeArea.jsx`
Khu vực bên phải, chứa Editor ở trên và Console ở dưới.

#### [NEW] `src/component/CodeArea/CodeEditorPanel.jsx`
Chứa EditorToolbar và `CodeEditor` (sẽ tái sử dụng và CSS lại `CodeEditor.jsx` hiện tại).

#### [NEW] `src/component/CodeArea/ConsolePanel.jsx`
Chứa Testcases và Test Results. (Sẽ thay thế/nâng cấp từ `OutputPanel.jsx` hiện tại).

#### [DELETE] `src/component/Room/RoomHeader.jsx`
Chúng ta sẽ xoá `RoomHeader.jsx` cũ vì nó không còn phù hợp với layout phân tách rõ ràng này.

#### [MODIFY] `src/App.jsx`
Sửa lại để render `Navbar` và `Workspace`.

## Verification Plan
1. Viết code cho Navbar, Workspace layout chung bằng CSS (Flexbox, màu nền tối).
2. Viết dummy dữ liệu mô phỏng đề bài.
3. Tích hợp `CodeEditor` hiện tại vào `CodeEditorPanel`.
4. Xem trước (preview) để đảm bảo giao diện giống với thiết kế trong ảnh.
