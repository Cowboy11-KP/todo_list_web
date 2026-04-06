import React from 'react';

const Sidebar = ({ currentView, changeView }) => {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
        <div style={{ width: 32, height: 32, background: 'var(--lumina-teal)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 10, height: 10, background: 'white', borderRadius: '50%', boxShadow: '0 0 0 2px var(--lumina-teal), 0 0 0 3px white' }}></div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>The Mindful</div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--lumina-teal)' }}>Curator</div>
          <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--lumina-teal)', marginTop: '2px', fontWeight: 600 }}>Deep Focus Mode</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <button onClick={() => changeView('dashboard')} style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem',
          background: currentView === 'dashboard' ? 'white' : 'transparent',
          color: currentView === 'dashboard' ? 'var(--lumina-teal)' : 'var(--lumina-teal)',
          border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer',
          fontWeight: currentView === 'dashboard' ? 600 : 500, transition: 'all 0.2s', boxShadow: currentView === 'dashboard' ? '0 2px 8px rgba(0,0,0,0.02)' : 'none'
        }}>
          <span style={{ fontSize: '1.25rem' }}>☀️</span> Today
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: 'transparent', color: 'var(--lumina-teal)', border: 'none', cursor: 'pointer', fontWeight: 500 
        }}>
          <span style={{ fontSize: '1.25rem' }}>📅</span> Upcoming
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: 'transparent', color: 'var(--lumina-teal)', border: 'none', cursor: 'pointer', fontWeight: 500 
        }}>
          <span style={{ fontSize: '1.25rem' }}>📁</span> Projects
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: 'transparent', color: 'var(--lumina-teal)', border: 'none', cursor: 'pointer', fontWeight: 500 
        }}>
          <span style={{ fontSize: '1.25rem' }}>🏷️</span> Labels
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: 'transparent', color: 'var(--lumina-teal)', border: 'none', cursor: 'pointer', fontWeight: 500 
        }}>
          <span style={{ fontSize: '1.25rem' }}>📥</span> Archive
        </button>
      </nav>

      {/* Action */}
      <button className="btn-primary" onClick={() => changeView('add_task')} style={{ width: '100%', padding: '1rem' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>+</span> New Task
      </button>
    </aside>
  );
};

export default Sidebar;
