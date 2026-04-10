import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';
import './Archive.css';

const Archive = () => {
  const navigate = useNavigate();
  const { tasks, toggleTask } = useTasks();

  const archivedTasks = tasks.filter(t => t.completed).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  const handleRestore = async (e, id) => {
    e.stopPropagation();
    await toggleTask(id);
  };

  return (
    <div className="archive-page">
      <div className="archive-header">
        <h1>Completed Archive</h1>
        <p>A history of everything you've accomplished.</p>
      </div>

      <div className="archive-list">
        {archivedTasks.length > 0 ? (
          archivedTasks.map(task => (
            <div key={task.id} className="archive-card" onClick={() => navigate(`/tasks/${task.id}`)}>
              <div className="archive-card-content">
                <h3 className="archive-card-title">{task.title}</h3>
                <div className="archive-card-meta">
                  {task.project && <span>📍 {task.project}</span>}
                  <span>✅ Completed {new Date(task.completedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <button className="btn-secondary archive-restore-btn" onClick={(e) => handleRestore(e, task.id)}>
                Restore
              </button>
            </div>
          ))
        ) : (
          <div className="archive-empty">
            <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>🗳️</span>
            <h2>Your archive is empty</h2>
            <p>Tasks you complete will show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
