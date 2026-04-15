import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../login/Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, clearError, handleRegister } = useAuth();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    await handleRegister(name, email, password);
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
            Create an account to start curating your life and turning overwhelming lists into a serene experience.
          </p>

          <div className="lumina-features">
            <div className="lumina-feature-card">
               <div className="lumina-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="#006054" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
               </div>
               <span className="lumina-feature-title">Get Organized</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lumina-form-container">
          <div className="lumina-form-header">
            <h2>Join Lumina</h2>
            <p>Create an account to access your workspace.</p>
          </div>

          {error && (
             <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
               {error}
             </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="lumina-form-group">
              <div className="lumina-label-row">
                <label className="lumina-label">Full Name</label>
              </div>
              <input
                type="text"
                className="lumina-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError(); }}
                required
              />
            </div>

            <div className="lumina-form-group">
              <div className="lumina-label-row">
                <label className="lumina-label">Work Email</label>
              </div>
              <input
                type="email"
                className="lumina-input"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError(); }}
                required
              />
            </div>

            <div className="lumina-form-group">
              <div className="lumina-label-row">
                <label className="lumina-label">Password</label>
              </div>
              <input
                type="password"
                className="lumina-input"
                placeholder="••••••••"
                pattern=".{6,}"
                title="8 characters minimum"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                required
              />
            </div>

            <button type="submit" className="lumina-btn-main" disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="lumina-footer" style={{ marginTop: '2rem' }}>
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
