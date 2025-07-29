import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>Welcome to NutriTrack</h1>
          <p>Sign in to track your nutrition journey</p>
        </div>
        <SignIn 
          routing="path" 
          path="/sign-in" 
          redirectUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 'auth-button',
              card: 'auth-card',
              headerTitle: 'auth-title',
              headerSubtitle: 'auth-subtitle'
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;