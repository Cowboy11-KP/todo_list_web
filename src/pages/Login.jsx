import React, { useState } from 'react';
import './Login.css'; // Importing the specific Lumina design styles

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && onLogin) {
      onLogin(email);
    }
  };

  return (
    <div className="lumina-container">
      <div className="lumina-layout">
        
        {/* Left Branding Section */}
        <div className="lumina-branding">
          <div className="lumina-logo">
            <div className="lumina-logo-icon"></div>
            Lumina Task
          </div>
          
          <h1 className="lumina-title">
            The Mindful<br />
            <em>Curator</em>
          </h1>
          
          <p className="lumina-subtitle">
            Transform your overwhelming lists into a serene, editorial experience. Clarity begins with focused intention.
          </p>

          <div className="lumina-features">
            <div className="lumina-feature-card">
              <div className="lumina-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#006054"/>
                  <path d="M5 4L5.8 6.2L8 7L5.8 7.8L5 10L4.2 7.8L2 7L4.2 6.2L5 4Z" fill="#006054"/>
                </svg>
              </div>
              <span className="lumina-feature-title">Deep Focus</span>
              <span className="lumina-feature-desc">Curated workflows for high-impact work.</span>
            </div>

            <div className="lumina-feature-card">
              <div className="lumina-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.15 2.15C10.65 1.65 11.3 1.4 12 1.4C12.7 1.4 13.35 1.65 13.85 2.15L14.8 3.1V4.5H16.2L17.15 2.15H17.2V2.15L21.85 6.8V6.85L19.5 7.8V9.2L20.45 10.15C20.95 10.65 21.2 11.3 21.2 12C21.2 12.7 20.95 13.35 20.45 13.85L19.5 14.8V16.2L21.85 17.15H21.8V17.2L17.15 21.85V21.8L16.2 19.5H14.8L13.85 20.45C13.35 20.95 12.7 21.2 12 21.2C11.3 21.2 10.65 20.95 10.15 20.45L9.2 19.5V18.1L6.85 17.15H6.8V17.2L2.15 12.55V12.5L4.5 11.55V10.15L3.55 9.2C3.05 8.7 2.8 8.05 2.8 7.35C2.8 6.65 3.05 6 3.55 5.5L4.5 4.55V3.15L6.85 2.2V2.15H6.9L10.15 2.15ZM12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8Z" fill="#3D4A45"/>
                </svg>
              </div>
              <span className="lumina-feature-title">Minimalist</span>
              <span className="lumina-feature-desc">Zero-clutter interface for mental breathing room.</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lumina-form-container">
          <div className="lumina-form-header">
            <h2>Welcome back</h2>
            <p>Enter your details to return to your workspace.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="lumina-form-group">
              <div className="lumina-label-row">
                <label className="lumina-label">Work Email</label>
              </div>
              <input 
                type="email" 
                className="lumina-input" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="lumina-form-group">
              <div className="lumina-label-row">
                <label className="lumina-label">Password</label>
                <a href="#" className="lumina-forgot">FORGOT?</a>
              </div>
              <input 
                type="password" 
                className="lumina-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <label className="lumina-checkbox">
              <input type="checkbox" />
              Stay signed in for 30 days
            </label>

            <button type="submit" className="lumina-btn-main">
              Sign into Lumina
            </button>
          </form>

          <div className="lumina-divider">Or continue with</div>

          <div className="lumina-socials">
            <button type="button" className="lumina-btn-social">
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button type="button" className="lumina-btn-social">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.98-2.05.8-3.08.35-1.09-.47-2.14-.4-3.18.06-1.12.5-2.05.77-3.01-.19C3.12 15.65 3.06 9.07 7.04 7.25c1.47-.68 2.76-.36 3.8.18 1.07.56 1.7.53 2.78 0 1.25-.63 2.79-.89 4.14-.15.99.55 1.76 1.48 2.21 2.58-2.45 1.16-2.03 4.41.44 5.34-.64 1.79-1.63 3.51-3.36 5.08zM12.03 7.25c-.17-2.18 1.63-4.14 3.79-4.25.4 2.21-1.74 4.31-3.79 4.25z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="lumina-footer">
            New to Lumina Task? <a href="#">Create a curator account</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
