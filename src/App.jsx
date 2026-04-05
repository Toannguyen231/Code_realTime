import React from 'react';
import './App.css';
import CodeApp from './CodeApp';
import Login from './component/Login/Login.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-shell" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 
        Tạm thời App.jsx chỉ giữ vai trò hiển thị duy nhất <CodeApp />.
        Sau này khi bạn muốn có trang Home (nhập mã room), 
        chúng ta sẽ cài đặt thư viện react-router-dom và chia tuyến tại vị trí này.
        Ví dụ:
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<CodeApp />} />
        </Routes>
      */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/room/:id" element={<CodeApp />} />
      </Routes>
    </div>
  );
}

export default App;
