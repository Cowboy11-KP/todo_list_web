import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';
import './TaskDetail.css';

const PRIORITY_CLASS = { high: 'pill-danger', medium: 'pill-primary', low: 'pill-neutral' };
const PRIORITY_LABEL = { high: 'High Priority', medium: 'Medium', low: 'Low' };

const formatDate = (dateStr) => {
  if (!dateStr) return 'No Date';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (t) => {
  if (!t) return 'All Day';
  const [h, min] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(min).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, error, toggleTask, deleteTask } = useTasks();

  const task = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      navigate(-1); // go back
    }
  };

  const handleToggle = async () => {
    await toggleTask(id);
  };

  if (loading) {
    return <div className="task-detail-page">Loading task details...</div>;
  }

  if (error) {
    return <div className="task-detail-page">Error: {error}</div>;
  }

  if (!task) {
    return (
      <div className="task-not-found">
        <h2>Task Not Found</h2>
        <p style={{ color: 'var(--text-muted)' }}>The task you are looking for does not exist or has been deleted.</p>
        <button className="btn-primary" onClick={() => navigate(-1)} style={{ marginTop: '1.5rem' }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <button className="btn-back" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="task-detail-page">
        <div className="task-detail-header">
          <div className="task-detail-title-group">
            <h1 className={`task-detail-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h1>
            <div className="task-detail-meta">
              <span className={`pill ${PRIORITY_CLASS[task.priority]}`}>
                {PRIORITY_LABEL[task.priority]}
              </span>
              {task.completed ? (
                <span className="pill pill-neutral">COMPLETED</span>
              ) : (
                <span className="pill pill-blue">IN PROGRESS</span>
              )}
              {task.project && (
                 <span className="pill pill-neutral" style={{ background: 'var(--insight-bg)' }}>
                   📍 {task.project}
                 </span>
              )}
            </div>
          </div>
          <div className="task-detail-actions">
            <button className="btn-secondary" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
              Edit
            </button>
            <button className={task.completed ? "btn-secondary" : "btn-primary"} onClick={handleToggle}>
              {task.completed ? 'Mark Incomplete' : 'Mark as Done'}
            </button>
            <button className="btn-secondary" onClick={handleDelete} style={{ color: '#cc0000', background: '#ffe5e5' }}>
              Delete
            </button>
          </div>
        </div>

        <div className="task-detail-section">
          <span className="section-label">Schedule</span>
          <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
            📅 {formatDate(task.dueDate)} &nbsp; • &nbsp; 🕒 {formatTime(task.dueTime)}
          </p>
        </div>

        <div className="task-detail-section">
          <span className="section-label">Description</span>
          <div className="task-detail-desc">
            {task.description || <em style={{ color: 'var(--text-muted)' }}>No description provided.</em>}
          </div>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="task-detail-section">
            <span className="section-label">Tags</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {task.tags.map((tag) => (
                <span key={tag} className="pill pill-gray" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="task-detail-section" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginTop: '1rem' }}>
          <span className="section-label">System Metadata</span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>ID: {task.id}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Created: {new Date(task.createdAt).toLocaleString()}</p>
          {task.completedAt && (
             <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Completed: {new Date(task.completedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
