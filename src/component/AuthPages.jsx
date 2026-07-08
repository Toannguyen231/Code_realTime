import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiMail, FiCheck, FiX, FiArrowLeft, FiLock, FiSend } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// ─── Email Verification Page ──────────────────────────────────
export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [status, setStatus] = useState(token ? 'verifying' : 'idle');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  // Tự động verify nếu có token trong URL
  React.useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (t) => {
    setStatus('verifying');
    try {
      const res = await fetch(`${API_URL}/auth/verify-email?token=${encodeURIComponent(t)}`, {
        method: 'GET',
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Xác thực email thành công!');
      } else {
        setStatus('error');
        setMessage(data.message || 'Link xác thực không hợp lệ hoặc đã hết hạn.');
      }
    } catch {
      setStatus('error');
      setMessage('Không thể kết nối server.');
    }
  };

  const resendVerification = async () => {
    if (!email) return;
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(res.ok
        ? 'Email xác thực đã được gửi lại. Vui lòng kiểm tra hộp thư.'
        : data.message || 'Gửi lại thất bại.');
    } catch {
      setMessage('Không thể kết nối server.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="verify-page">
      <div className="verify-card">
        {status === 'idle' && (
          <>
            <FiMail size={48} className="verify-icon" />
            <h2>Xác thực email</h2>
            <p>Nhập email của bạn để nhận lại link xác thực.</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={resendVerification} disabled={sending}>
              <FiSend size={14} /> {sending ? 'Đang gửi...' : 'Gửi lại xác thực'}
            </button>
            {message && <p className="verify-message">{message}</p>}
          </>
        )}

        {status === 'verifying' && (
          <>
            <div className="verify-spinner" />
            <h2>Đang xác thực...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <FiCheck size={48} className="verify-icon success" />
            <h2>Xác thực thành công!</h2>
            <p>{message}</p>
            <button onClick={() => navigate('/login')}>
              <FiArrowLeft size={14} /> Đăng nhập ngay
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <FiX size={48} className="verify-icon error" />
            <h2>Xác thực thất bại</h2>
            <p>{message}</p>
            <button onClick={() => setStatus('idle')}>
              Thử lại
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Forgot Password Page ────────────────────────────────────
export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(res.ok
        ? 'Link đặt lại mật khẩu đã được gửi vào email của bạn (nếu tài khoản tồn tại).'
        : data.message || 'Có lỗi xảy ra.');
      if (res.ok) setStatus('sent');
    } catch {
      setMessage('Không thể kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <FiLock size={48} className="forgot-icon" />
        <h2>Quên mật khẩu</h2>
        <p>Nhập email để nhận link đặt lại mật khẩu.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </button>
        </form>
        {message && <p className={status === 'sent' ? 'success' : 'error'}>{message}</p>}
        <button className="back-btn" onClick={() => navigate('/login')}>
          ← Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}

// ─── Reset Password Page ─────────────────────────────────────
export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(token ? 'resetting' : 'idle');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!token) {
      setMessage('Link đặt lại mật khẩu không hợp lệ.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (password.length < 6) {
      setMessage('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Đặt lại mật khẩu thành công!');
        setStatus('success');
      } else {
        setMessage(data.message || 'Link không hợp lệ hoặc đã hết hạn.');
      }
    } catch {
      setMessage('Không thể kết nối server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <FiLock size={48} className="reset-icon" />
        <h2>Đặt lại mật khẩu</h2>
        {status === 'resetting' && (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
          </form>
        )}
        {status === 'success' && (
          <>
            <FiCheck size={48} className="reset-icon success" />
            <p>Mật khẩu đã được đặt lại thành công!</p>
            <button onClick={() => navigate('/login')}>
              ← Đăng nhập ngay
            </button>
          </>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
