import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>User information not available.</p>;
  }

  return (
    <div className="user-profile-summary">
      <p>Hello, <strong>{user.name || user.email}</strong>!</p>
      <p>Manage your personal data and settings on the <Link to="/profile">Profile page</Link>.</p>
      {/* Add more summary info if desired, e.g., total balance across active accounts */}
    </div>
  );
};

export default UserProfile;
