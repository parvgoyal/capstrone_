import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>Join NutriTrack</h1>
          <p>Start your personalized nutrition journey today</p>
        </div>
        <SignUp 
          routing="path" 
          path="/sign-up" 
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

export default SignUpPage;