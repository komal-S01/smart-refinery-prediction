import { NavLink, useNavigate } from 'react-router-dom';
import {
  MdDashboard, MdScience, MdBolt, MdBuild, MdSpeed,
  MdAutoAwesome, MdAnalytics, MdAssessment, MdSettings,
  MdPerson, MdLogout, MdChevronLeft, MdChevronRight,
} from 'react-icons/md';
import logo from '../../assets/logo.png';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { path: '/product-quality', label: 'Product Quality', icon: MdScience },
  { path: '/energy-prediction', label: 'Energy Prediction', icon: MdBolt },
  { path: '/equipment-efficiency', label: 'Equipment Efficiency', icon: MdBuild },
  { path: '/throughput', label: 'Throughput Prediction', icon: MdSpeed },
  { path: '/dashboard#ai', label: 'AI Recommendation', icon: MdAutoAwesome },
  { path: '/dashboard#analytics', label: 'Analytics', icon: MdAnalytics },
  { path: '/reports', label: 'Reports', icon: MdAssessment },
  { path: '/settings', label: 'Settings', icon: MdSettings },
  { path: '/profile', label: 'Profile', icon: MdPerson },
];

function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    onMobileClose?.();
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          {!collapsed && <span className="sidebar-brand">SmartRefinery</span>}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onMobileClose}
              end={path === '/dashboard'}
            >
              <Icon className="sidebar-icon" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
          <button className="sidebar-link logout-link" onClick={handleLogout}>
            <MdLogout className="sidebar-icon" />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>

        <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
