import { Settings as SettingsIcon, User, Bell, Lock } from 'lucide-react';

const Settings = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SettingsIcon /> Admin Settings
        </h2>
        <p style={{ color: 'var(--muted-foreground)' }}>Manage your profile and system preferences.</p>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Settings Sidebar */}
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button style={{ ...menuBtnStyle, backgroundColor: 'var(--muted)', color: 'var(--foreground)' }}>
            <User size={18} /> Profile
          </button>
          <button style={{ ...menuBtnStyle }}>
            <Bell size={18} /> Notifications
          </button>
          <button style={{ ...menuBtnStyle }}>
            <Lock size={18} /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div style={{
          flex: 1,
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '32px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Profile Information</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '500', fontSize: '14px' }}>Full Name</label>
              <input 
                type="text" 
                defaultValue="Admin User"
                style={inputStyle}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '500', fontSize: '14px' }}>Email Address</label>
              <input 
                type="email" 
                defaultValue="admin@healthai.com"
                style={inputStyle}
              />
            </div>

            <div style={{ marginTop: '16px' }}>
              <button style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                padding: '10px 24px',
                borderRadius: 'var(--radius)',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const menuBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: 'var(--radius)',
  textAlign: 'left' as const,
  color: 'var(--muted-foreground)',
  fontWeight: '500',
  transition: 'all 0.2s ease'
};

const inputStyle = {
  padding: '10px 16px',
  backgroundColor: 'var(--background)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  outline: 'none',
  fontSize: '14px'
};

export default Settings;
