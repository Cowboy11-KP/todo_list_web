import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearError = () => setError(null);

  const handleLogin = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.loginAPI(email, password);
      // Backend returns { token, user }
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleRegister = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      await authService.registerAPI(name, email, password);
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    authService.logoutAPI();
    navigate('/login');
  }, [navigate]);

  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  return {
    currentUser,
    loading,
    error,
    clearError,
    handleLogin,
    handleRegister,
    handleLogout
  };
};

export default useAuth;
