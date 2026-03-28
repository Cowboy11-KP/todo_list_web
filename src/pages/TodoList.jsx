import React from 'react';
import TaskCard from '../components/TaskCard';

const TodoList = ({ tasks, setTasks, onEdit }) => {
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
        <p>No tasks yet. Enjoy your day!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="task-list">
      {activeTasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
          onEdit={onEdit} 
        />
      ))}
      {completedTasks.length > 0 && (
        <>
          <h4 style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Completed</h4>
          <div style={{ opacity: 0.7 }}>
            {completedTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
