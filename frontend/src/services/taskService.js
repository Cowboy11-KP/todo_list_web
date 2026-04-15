const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Unknown API error');
  }
  return res.json();
};

const fetchWithAuth = (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': token } : {}),
    ...options.headers,
  };
  return fetch(`${BASE_URL}${endpoint}`, { ...options, headers }).then(handleResponse);
};

export const getAll = async () => {
  return fetchWithAuth('/tasks');
};

export const getById = async (id) => {
  // We fetch all and filter locally because the current backend lacks a GET /tasks/:id endpoint
  const allTasks = await fetchWithAuth('/tasks');
  return allTasks.find(t => String(t.id) === String(id));
};

export const create = async (data) => {
  await fetchWithAuth('/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  // Fetch again to return the full task object
  const allTasks = await fetchWithAuth('/tasks');
  return allTasks[0]; 
};

export const update = async (id, changes) => {
  await fetchWithAuth(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  });
  const allTasks = await fetchWithAuth('/tasks');
  return allTasks.find(t => String(t.id) === String(id));
};

export const toggle = async (id, currentCompletedStatus) => {
  await fetchWithAuth(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed: currentCompletedStatus }),
  });
  const allTasks = await fetchWithAuth('/tasks');
  return allTasks.find(t => String(t.id) === String(id));
};

export const remove = async (id) => {
  return fetchWithAuth(`/tasks/${id}`, { method: 'DELETE' });
};

const taskService = { getAll, getById, create, update, toggle, remove };
export default taskService;
