import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (!isLogin && !name)) return;

    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const body = isLogin ? { email, password } : { name, email, password };
      
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        // Registered successfully, switch to login
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
                </svg>
               </div>
               <span className="lumina-feature-title">Deep Focus</span>
            </div>
            <div className="lumina-feature-card">
               <div className="lumina-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fillRule="evenodd" clipRule="evenodd" d="M10.15 2.15C10.65 1.65 11.3 1.4 12 1.4C12.7 1.4 13.35 1.65 13.85 2.15L14.8 3.1V4.5H16.2L17.15 2.15H17.2V2.15L21.85 6.8V6.85L19.5 7.8V9.2L20.45 10.15H10.15V2.15Z" fill="#3D4A45"/>
                </svg>
               </div>
               <span className="lumina-feature-title">Minimalist</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lumina-form-container">
          <div className="lumina-form-header">
            <h2>{isLogin ? 'Welcome back' : 'Join Lumina'}</h2>
            <p>{isLogin ? 'Enter your details to return to your workspace.' : 'Create an account to start curating your life.'}</p>
          </div>

          {error && (
             <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
               {error}
             </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="lumina-form-group">
                <div className="lumina-label-row">
                  <label className="lumina-label">Full Name</label>
                </div>
                <input
                  type="text"
                  className="lumina-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

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
                {isLogin && <a href="#" className="lumina-forgot">FORGOT?</a>}
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

            {isLogin && (
              <label className="lumina-checkbox">
                <input type="checkbox" />
                Stay signed in for 30 days
              </label>
            )}

            <button type="submit" className="lumina-btn-main" disabled={loading}>
              {loading ? 'Processing...' : isLogin ? 'Sign into Lumina' : 'Create Account'}
            </button>
          </form>

          <div className="lumina-footer" style={{ marginTop: '2rem' }}>
            {isLogin ? "New to Lumina Task? " : "Already have an account? "}
            <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? "Create a curator account" : "Sign in here"}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
