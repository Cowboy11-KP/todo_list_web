const pool = require('../db');

exports.getTasks = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, project, tags, due_date, due_time } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const validPriority = ['low', 'medium', 'high'];
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    await pool.query(
      `INSERT INTO tasks 
      (user_id, title, description, priority, project, tags, due_date, due_time) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        title.trim(),
        description || null,
        priority || 'medium',
        project || null,
        tags ? JSON.stringify(tags) : null,
        due_date || null,
        due_time || null
      ]
    );

    res.status(201).json({ message: 'Task created successfully' });

  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const { title, description, priority, completed } = req.body;

    const validPriority = ['low', 'medium', 'high'];
    if (priority && !validPriority.includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }

    let completed_at;
    if (completed === true) completed_at = new Date();
    else if (completed === false) completed_at = null;

    await pool.query(
      `UPDATE tasks 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           priority = COALESCE(?, priority),
           completed = COALESCE(?, completed),
           completed_at = COALESCE(?, completed_at)
       WHERE id = ? AND user_id = ?`,
      [title, description, priority, completed, completed_at, id, req.user.id]
    );

    res.json({ message: 'Task updated successfully' });

  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    res.json({ message: 'Task deleted successfully' });

  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};