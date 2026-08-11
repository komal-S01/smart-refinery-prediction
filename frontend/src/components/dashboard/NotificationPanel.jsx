import { MdWarning, MdInfo, MdCheckCircle } from 'react-icons/md';
import { notifications } from '../../services/api';

const iconMap = { warning: MdWarning, info: MdInfo, success: MdCheckCircle };

function NotificationPanel() {
  return (
    <div className="panel notification-panel">
      <div className="panel-header">
        <h3>Notifications</h3>
        <span className="badge-count">{notifications.length}</span>
      </div>
      <div className="notification-list">
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || MdInfo;
          return (
            <div key={n.id} className={`notification-item type-${n.type}`}>
              <div className={`notif-icon type-${n.type}`}>
                <Icon />
              </div>
              <div className="notif-content">
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotificationPanel;
