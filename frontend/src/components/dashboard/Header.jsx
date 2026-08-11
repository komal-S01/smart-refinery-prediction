import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdNotifications, MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md';
import logo from '../../assets/logo.png';

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onMenuClick} aria-label="Menu">
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>
        <img src={logo} alt="Company Logo" className="header-logo" />
        <div className="header-title">
          <h1>AI Smart Refinery</h1>
          <span>Optimization System</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <MdSearch className="search-icon" />
          <input type="text" placeholder="Search sensors, reports, equipment..." />
        </div>
      </div>

      <div className="header-right">
        <div className="header-datetime">
          <span className="header-date">{formatDate(time)}</span>
          <span className="header-time">{formatTime(time)}</span>
        </div>

        <div className="notification-wrapper">
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <MdNotifications />
            <span className="notification-badge">4</span>
          </button>
          {showNotifications && (
            <div className="header-notif-dropdown fade-in">
              <p className="dropdown-title">Notifications</p>
              <div className="dropdown-item">High Furnace Temperature</div>
              <div className="dropdown-item">Energy Usage Increased</div>
              <div className="dropdown-item">Pump Maintenance Due</div>
              <div className="dropdown-item">AI Recommendation Available</div>
            </div>
          )}
        </div>

        <button className="header-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <button className="header-avatar" onClick={() => navigate('/profile')} aria-label="Profile">
          <span>AK</span>
        </button>

        <button className="header-logout btn-ripple" onClick={() => navigate('/login')}>
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
