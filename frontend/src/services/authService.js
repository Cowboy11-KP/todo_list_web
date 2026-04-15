const BASE_URL = 'http://localhost:3000/auth';

const handleResponse = async (res) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error((data && data.message) ? data.message : 'Authentication failed');
  }
  return data;
};

export const loginAPI = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(response);
};

export const registerAPI = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(response);
};

export const logoutAPI = () => {
  // Clear local storage for a hard logout
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = { loginAPI, registerAPI, logoutAPI };
export default authService;
