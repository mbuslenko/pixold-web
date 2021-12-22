import React from 'react';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
  return (
    <div className="login-wrap">
      <div className="login-content">
        <div className="logo"></div>
        <div className="login-title">Authenticate</div>
        <div className="login-desc">You need to be authorized to play the game</div>
        <div className="login-btn-wrap">
          <button className="login-btn login-apple-btn">Continue with Apple</button>
          <button className="login-btn login-google-btn">Continue with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
