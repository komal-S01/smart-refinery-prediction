import { MdEdit, MdEmail, MdWork, MdBusiness } from 'react-icons/md';

function Profile() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Profile</h2>
        <p>Manage your account information</p>
      </div>

      <div className="profile-page-card panel">
        <div className="profile-page-header">
          <div className="profile-avatar-xl">
            <span>AK</span>
          </div>
          <button className="btn btn-outline btn-ripple">
            <MdEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <MdEdit className="field-icon" />
            <div>
              <label>Name</label>
              <p>Arjun Kumar</p>
            </div>
          </div>
          <div className="profile-field">
            <MdEmail className="field-icon" />
            <div>
              <label>Email</label>
              <p>arjun.kumar@smartrefinery.com</p>
            </div>
          </div>
          <div className="profile-field">
            <MdWork className="field-icon" />
            <div>
              <label>Role</label>
              <p>Senior Process Engineer</p>
            </div>
          </div>
          <div className="profile-field">
            <MdBusiness className="field-icon" />
            <div>
              <label>Department</label>
              <p>Refinery Operations — Unit 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
