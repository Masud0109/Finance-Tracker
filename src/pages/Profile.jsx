import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateProfile, changePassword, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currencyPreference, setCurrencyPreference] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // New state
  const [showNewPassword, setShowNewPassword] = useState(false);     // New state
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // New state
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setCurrencyPreference(user.currencyPreference || 'USD');
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage('');

    const profileData = { name, email, currencyPreference };
    const result = await updateProfile(user.id || user.email, profileData);

    if (result.success) {
      setProfileMessage('Profile updated successfully!');
    } else {
      setProfileMessage(result.message || 'Profile update failed.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('New password and confirm password do not match.');
      return;
    }
    if (!currentPassword || !newPassword) {
      setPasswordMessage('Please fill in all password fields.');
      return;
    }

    const result = await changePassword(user.id || user.email, currentPassword, newPassword);

    if (result.success) {
      setPasswordMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setPasswordMessage(result.message || 'Password change failed.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>

        <section className="profile-section">
          <h3>Edit Personal Details</h3>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="profile-name">Name:</label>
              <input
                type="text"
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="profile-email">Email:</label>
              <input
                type="email"
                id="profile-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="currency-preference">Currency Preference:</label>
              <select
                id="currency-preference"
                value={currencyPreference}
                onChange={(e) => setCurrencyPreference(e.target.value)}
                className="form-input"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </div>
            {profileMessage && <p className={`text-sm mt-2 ${profileMessage.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{profileMessage}</p>}
            <button type="submit" className="profile-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </section>

        <section className="profile-section">
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword} className="profile-form">
            <div className="form-group">
              <label htmlFor="current-password">Current Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  id="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="password-toggle-button"
                >
                  {showCurrentPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="password-toggle-button"
                >
                  {showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-new-password">Confirm New Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  id="confirm-new-password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  className="password-toggle-button"
                >
                  {showConfirmNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {passwordMessage && <p className={`text-sm mt-2 ${passwordMessage.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>{passwordMessage}</p>}
            <button type="submit" className="profile-button" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </section>

        <button onClick={logout} className="profile-logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
