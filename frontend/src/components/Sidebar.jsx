import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', icon: '☀️', label: 'Today' },
  { to: '/upcoming', icon: '📅', label: 'Upcoming' },
  { to: '/projects', icon: '📁', label: 'Projects' },
  { to: '/labels', icon: '🏷️', label: 'Labels' },
  { to: '/archive', icon: '📥', label: 'Archive' },
];

const Sidebar = () => {
  const navigate = useNavigate();

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
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1rem',
              background: isActive ? 'white' : 'transparent',
              color: 'var(--lumina-teal)',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            })}
          >
            <span style={{ fontSize: '1.25rem' }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Action */}
      <button
        className="btn-primary"
        onClick={() => navigate('/tasks/new')}
        style={{ width: '100%', padding: '1rem' }}
      >
        <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>+</span> New Task
      </button>
    </aside>
  );
};

export default Sidebar;
