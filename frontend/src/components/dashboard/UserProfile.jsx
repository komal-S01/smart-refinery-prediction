import { MdEdit } from 'react-icons/md';

function UserProfile({ compact }) {
  return (
    <div className={`user-profile ${compact ? 'compact' : ''}`}>
      <div className="profile-avatar-lg">
        <span>AK</span>
      </div>
      {!compact && (
        <div className="profile-info">
          <h4>Arjun Kumar</h4>
          <span>Process Engineer</span>
        </div>
      )}
      {!compact && (
        <button className="btn btn-outline btn-sm">
          <MdEdit /> Edit
        </button>
      )}
    </div>
  );
}

export default UserProfile;
