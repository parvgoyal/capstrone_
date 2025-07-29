import React from 'react';
import { UserProfile } from '@clerk/clerk-react';

const UserProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <h1>Your Profile</h1>
        <p>Manage your account settings and preferences</p>
        <UserProfile 
          routing="path" 
          path="/profile" 
          appearance={{
            elements: {
              card: 'profile-card',
              navbar: 'profile-navbar',
              navbarButton: 'profile-nav-button'
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;