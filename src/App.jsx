import React from 'react';
import './App.css';
import CodeApp from './CodeApp';
import Login from './component/Login/Login.jsx';
import { EmailVerification, ForgotPassword, ResetPassword } from './component/AuthPages.jsx';
import RoomMenu from './component/RoomMenu/RoomMenu.jsx';
import Profile from './component/Profile/Profile.jsx';
import PublicProfile from './component/Profile/PublicProfile.jsx';
import ProblemListPage from './component/Problems/ProblemListPage.jsx';
import ProblemPage from './component/Problems/ProblemPage.jsx';
import AdminDashboard from './component/Admin/AdminDashboard.jsx';
import BattleHub from './component/Battle/BattleHub.jsx';
import Settings from './component/Settings/Settings.jsx';
import BattleQueue from './component/Battle/BattleQueue.jsx';
import BattleRoom from './component/Battle/BattleRoom.jsx';
import LandingPage from './landing/LandingPage.jsx';
import './landing/landing.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<RoomMenu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user/:userId" element={<PublicProfile />} />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route path="/problems/:contestId/:index" element={<ProblemPage />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/room/:id" element={<CodeApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/battle" element={<BattleHub />} />
        <Route path="/battle/queue" element={<BattleQueue />} />
        <Route path="/battle/:id" element={<BattleRoom />} />
      </Routes>
    </div>
  );
}

export default App;
 