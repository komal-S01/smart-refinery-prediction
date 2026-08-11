import { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    emailNotif: true,
    pushNotif: true,
    apiUrl: 'http://localhost:5000/api',
    refreshRate: 30,
    language: 'en',
  });

  const handleChange = (key, value) => setSettings({ ...settings, [key]: value });

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Configure system preferences and integrations</p>
      </div>

      <div className="settings-grid">
        <div className="panel settings-section">
          <h3>Theme</h3>
          <div className="setting-row">
            <label>Appearance</label>
            <select value={settings.theme} onChange={(e) => handleChange('theme', e.target.value)}>
              <option value="light">Light Industrial</option>
              <option value="dark">Dark Control Room</option>
              <option value="auto">System Default</option>
            </select>
          </div>
        </div>

        <div className="panel settings-section">
          <h3>Notifications</h3>
          <div className="setting-row toggle-row">
            <label>Email Notifications</label>
            <label className="toggle">
              <input type="checkbox" checked={settings.emailNotif} onChange={(e) => handleChange('emailNotif', e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
          <div className="setting-row toggle-row">
            <label>Push Notifications</label>
            <label className="toggle">
              <input type="checkbox" checked={settings.pushNotif} onChange={(e) => handleChange('pushNotif', e.target.checked)} />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        <div className="panel settings-section">
          <h3>API Configuration</h3>
          <div className="setting-row">
            <label>API Base URL</label>
            <input type="url" value={settings.apiUrl} onChange={(e) => handleChange('apiUrl', e.target.value)} />
          </div>
          <div className="setting-row">
            <label>Data Refresh Rate (seconds)</label>
            <input type="number" value={settings.refreshRate} onChange={(e) => handleChange('refreshRate', parseInt(e.target.value))} min={5} max={300} />
          </div>
        </div>

        <div className="panel settings-section">
          <h3>User Preferences</h3>
          <div className="setting-row">
            <label>Language</label>
            <select value={settings.language} onChange={(e) => handleChange('language', e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          <button className="btn btn-primary btn-ripple" style={{ marginTop: 16 }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
