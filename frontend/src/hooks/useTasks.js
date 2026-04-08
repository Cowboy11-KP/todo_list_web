/**
 * useTasks.js — Custom hook quản lý task state
 *
 * Cung cấp:
 *  - tasks      : mảng đầy đủ
 *  - loading    : true trong khi fetch
 *  - error      : string | null
 *  - todayTasks : tasks có dueDate = hôm nay
 *  - upcomingTasks : tasks có dueDate > hôm nay, chưa hoàn thành, sort theo ngày
 *  - createTask, updateTask, toggleTask, deleteTask : CRUD async
 *  - refresh    : gọi lại để re-fetch (hữu dụng khi pagination hay pull-to-refresh)
 */

import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';

// ─── Date helper ───────────────────────────────────────────────────────────
const toDateStr = (date) => date.toISOString().split('T')[0]; // 'YYYY-MM-DD'

const TODAY = toDateStr(new Date());

// ─── Hook ──────────────────────────────────────────────────────────────────
const useTasks = () => {
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // ── Fetch all ────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message ?? 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ── CRUD ─────────────────────────────────────────────────────

  const createTask = useCallback(async (taskData) => {
    try {
      const created = await taskService.create(taskData);
      setTasks((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, changes) => {
    try {
      const updated = await taskService.update(id, changes);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const toggleTask = useCallback(async (id) => {
    // Optimistic update — đổi ngay trên UI, rollback nếu server lỗi
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
          : t
      )
    );
    try {
      const updated = await taskService.toggle(id);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
      // Rollback
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, completed: !t.completed, completedAt: t.completed ? null : t.completedAt }
            : t
        )
      );
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    const snapshot = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id)); // optimistic
    try {
      await taskService.remove(id);
    } catch (err) {
      setError(err.message);
      setTasks(snapshot); // rollback
    }
  }, [tasks]);

  // ── Derived data ─────────────────────────────────────────────

  /** Tasks có dueDate = hôm nay */
  const todayTasks = tasks.filter((t) => t.dueDate === TODAY);

  /** Stats cho hôm nay */
  const todayStats = {
    total    : todayTasks.length,
    done     : todayTasks.filter((t) => t.completed).length,
    highPrio : todayTasks.filter((t) => t.priority === 'high' && !t.completed).length,
  };

  /** Tasks có dueDate > hôm nay, chưa hoàn thành, sort tăng dần theo ngày */
  const upcomingTasks = tasks
    .filter((t) => t.dueDate && t.dueDate > TODAY && !t.completed)
    .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));

  return {
    // State
    tasks,
    loading,
    error,
    // Derived
    todayTasks,
    todayStats,
    upcomingTasks,
    // Actions
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    refresh: fetchTasks,
  };
};

export default useTasks;
