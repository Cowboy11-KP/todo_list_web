import React, { useState } from 'react';

const TaskForm = ({ changeView }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ maxWidth: 800 }}>
      {/* Form Container */}
      <div style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Title Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Task Title
          </div>
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-main)', 
              border: 'none', outline: 'none', background: 'transparent', padding: '0.5rem 0',
              borderLeft: '2px solid var(--border-light)', paddingLeft: '1rem'
            }} 
          />
        </div>

        {/* Description Input */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Description
          </div>
          <textarea 
            placeholder="Add notes or details for this task..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ 
              width: '100%', minHeight: '120px', background: 'var(--input-bg)', border: 'none', 
              borderRadius: 'var(--radius-md)', padding: '1.25rem', fontSize: '0.9375rem', 
              color: 'var(--text-main)', outline: 'none', resize: 'none'
            }} 
          />
        </div>

        {/* Grid Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* Schedule */}
          <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lumina-teal)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <span>📅</span> SCHEDULE
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, background: 'white', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <span>mm/dd/yyyy</span>
                <span>📅</span>
              </div>
              <div style={{ flex: 1, background: 'white', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <span>-- : --</span>
                <span>⏱️</span>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lumina-teal)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <span>❗</span> PRIORITY
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '0.25rem', borderRadius: 'var(--radius-full)' }}>
              <button style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Low</button>
              <button style={{ flex: 1, background: 'var(--insight-bg)', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--lumina-teal)', fontSize: '0.875rem', fontWeight: 600 }}>Medium</button>
              <button style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem', borderRadius: 'var(--radius-full)', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>High</button>
            </div>
          </div>

          {/* Project */}
          <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lumina-teal)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <span>🔺</span> PROJECT
            </div>
            <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
              <span>Personal Development</span>
              <span style={{ color: 'var(--text-muted)' }}>⌄</span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lumina-teal)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              <span>🏷️</span> TAGS
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ background: '#7bf0e3', color: 'var(--lumina-teal)', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>Focus</span>
              <span style={{ background: '#b3e6f5', color: '#006080', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>Deep Work</span>
              <button style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>+</button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border-light)', margin: '0 -2.5rem 2rem -2.5rem' }}></div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
            <span>🗑️</span> Discard Draft
          </button>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-secondary" onClick={() => changeView('dashboard')}>Cancel</button>
            <button className="btn-primary" onClick={() => changeView('dashboard')}>Create Task</button>
          </div>
        </div>

      </div>

      {/* Keyboard hints */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ border: '1px solid var(--border-light)', padding: '0.2rem 0.4rem', borderRadius: 4, background: 'white' }}>ESC</span>
          TO CLOSE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ border: '1px solid var(--border-light)', padding: '0.2rem 0.4rem', borderRadius: 4, background: 'white' }}>⌘ + S</span>
          QUICK SAVE
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
