import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import '../styles/login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-icon">SR</div>
          <h1>AI Smart Refinery</h1>
          <p>Optimization System</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <p className="login-subtitle">Access your refinery control dashboard</p>

          <div className="input-group">
            <MdEmail className="input-icon" />
            <input type="email" placeholder="Email address" required />
          </div>

          <div className="input-group">
            <MdLock className="input-icon" />
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" required />
            <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember Me
            </label>
            <Link to="#" className="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-submit btn-ripple">Login</button>
        </form>
      </div>

      <div className="login-right">
        <div className="refinery-illustration">
          <div className="illo-tower tower-1" />
          <div className="illo-tower tower-2" />
          <div className="illo-tower tower-3" />
          <div className="illo-pipe pipe-1" />
          <div className="illo-pipe pipe-2" />
          <div className="illo-tank tank-1" />
          <div className="illo-tank tank-2" />
          <div className="illo-smoke smoke-1" />
          <div className="illo-smoke smoke-2" />
          <div className="illo-glow" />
        </div>
        <div className="login-right-text">
          <h2>Industrial Intelligence</h2>
          <p>AI-powered optimization for modern refinery operations</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
