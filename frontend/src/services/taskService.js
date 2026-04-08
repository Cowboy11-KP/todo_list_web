/**
 * taskService.js — Data Access Layer cho Tasks
 *
 * Tầng này trừu tượng hóa nguồn dữ liệu.
 * Hiện tại dùng mock data; khi có backend thật, chỉ cần thay phần
 * implementation bên trong mỗi hàm (ví dụ đổi mock → fetch/axios)
 * mà KHÔNG cần sửa bất kỳ component hay hook nào.
 *
 * Tất cả hàm đều trả về Promise để chuẩn bị sẵn cho async API.
 *
 * Để chuyển sang API thật:
 *   1. Đổi `USE_MOCK = false`
 *   2. Điền BASE_URL
 *   3. Các hàm sẽ tự động gọi fetch thay vì dùng mock
 */

import mockTasks from '../data/mockTasks';

// ─── Config ────────────────────────────────────────────────────────────────
const USE_MOCK = true;
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

// In-memory store khi dùng mock (simulate database)
let _mockStore = [...mockTasks];

// Giả lập độ trễ mạng để UI loading state hoạt động thật
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// ─── Helpers ───────────────────────────────────────────────────────────────
const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? 'Unknown API error');
  }
  return res.json();
};

// ─── Service Methods ───────────────────────────────────────────────────────

/**
 * Lấy toàn bộ danh sách task.
 * @returns {Promise<Task[]>}
 */
export const getAll = async () => {
  if (USE_MOCK) {
    await delay();
    return [..._mockStore];
  }
  return fetch(`${BASE_URL}/tasks`).then(handleResponse);
};

/**
 * Lấy task theo id.
 * @param {string} id
 * @returns {Promise<Task>}
 */
export const getById = async (id) => {
  if (USE_MOCK) {
    await delay();
    const task = _mockStore.find((t) => t.id === id);
    if (!task) throw new Error(`Task ${id} not found`);
    return { ...task };
  }
  return fetch(`${BASE_URL}/tasks/${id}`).then(handleResponse);
};

/**
 * Tạo task mới.
 * @param {Omit<Task, 'id' | 'createdAt' | 'completedAt'>} data
 * @returns {Promise<Task>}
 */
export const create = async (data) => {
  if (USE_MOCK) {
    await delay();
    const newTask = {
      ...data,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    _mockStore = [..._mockStore, newTask];
    return { ...newTask };
  }
  return fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);
};

/**
 * Cập nhật một phần task (PATCH semantics).
 * @param {string} id
 * @param {Partial<Task>} changes
 * @returns {Promise<Task>}
 */
export const update = async (id, changes) => {
  if (USE_MOCK) {
    await delay();
    let updated = null;
    _mockStore = _mockStore.map((t) => {
      if (t.id !== id) return t;
      updated = { ...t, ...changes };
      return updated;
    });
    if (!updated) throw new Error(`Task ${id} not found`);
    return { ...updated };
  }
  return fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  }).then(handleResponse);
};

/**
 * Toggle trạng thái hoàn thành.
 * @param {string} id
 * @returns {Promise<Task>}
 */
export const toggle = async (id) => {
  if (USE_MOCK) {
    await delay(100);
    const task = _mockStore.find((t) => t.id === id);
    if (!task) throw new Error(`Task ${id} not found`);
    return update(id, {
      completed: !task.completed,
      completedAt: !task.completed ? new Date().toISOString() : null,
    });
  }
  return fetch(`${BASE_URL}/tasks/${id}/toggle`, { method: 'PATCH' }).then(handleResponse);
};

/**
 * Xóa task.
 * @param {string} id
 * @returns {Promise<{ success: boolean }>}
 */
export const remove = async (id) => {
  if (USE_MOCK) {
    await delay();
    const exists = _mockStore.some((t) => t.id === id);
    if (!exists) throw new Error(`Task ${id} not found`);
    _mockStore = _mockStore.filter((t) => t.id !== id);
    return { success: true };
  }
  return fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' }).then(handleResponse);
};

// ─── Named export object (optional — dùng để mock dễ hơn trong tests) ──────
const taskService = { getAll, getById, create, update, toggle, remove };
export default taskService;
