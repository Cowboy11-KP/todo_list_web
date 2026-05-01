import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import useAuth from '../hooks/useAuth';

const pageTitles = {
  '/dashboard': 'Lumina Task',
  '/tasks/new': 'New Task',
  '/tasks': 'All Tasks',
  '/archive': 'Archive'
};

const Topbar = ({ onToggleSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[pathname] ?? 'Lumina Task';

  const { tasks } = useTasks();
  const { currentUser, handleLogout } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchTerm.trim()
    ? tasks.filter(t => 
        (t.title && t.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.project && t.project.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelect = (id) => {
    setSearchTerm('');
    setShowDropdown(false);
    navigate(`/tasks/${id}`);
  };

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        <button className="btn-icon-nav sidebar-toggle" onClick={onToggleSidebar} style={{ padding: '0.5rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="topbar-title" style={{ fontWeight: 700, fontSize: pathname === '/tasks/new' ? '1.5rem' : '1.25rem', whiteSpace: 'nowrap' }}>
          {title}
        </div>

        <div className="search-wrapper" ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--lumina-teal)', pointerEvents: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </span>
          <input 
            type="text" 
            className="input-search" 
            placeholder="Search tasks or projects..." 
            style={{ width: '100%' }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
          />
          
          {/* Dropdown Results */}
          {showDropdown && searchTerm.trim().length > 0 && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map(task => (
                  <div key={task.id} className="search-result-item" onClick={() => handleSelect(task.id)}>
                    <div className="search-result-title" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.title}
                    </div>
                    <div className="search-result-meta">
                      {task.project ? `📍 ${task.project}` : 'No Project'} • {task.priority} priority
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No tasks matched your search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn-icon-nav">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>
        <button className="btn-icon-nav">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>
        <div style={{ position: 'relative' }} ref={userDropdownRef}>
          <div 
            style={{ width: 36, height: 36, borderRadius: '50%', background: '#fbdcb7', border: '2px solid white', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser?.name || 'Sarah'}&backgroundColor=transparent`} alt="Avatar" width="100%" height="100%" />
          </div>

          {showUserDropdown && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                <div style={{ fontWeight: 600 }}>{currentUser?.name || 'My Account'}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentUser?.email || 'user@example.com'}</div>
              </div>
              <div className="user-dropdown-divider"></div>
              <div className="user-dropdown-item text-danger" onClick={() => {
                setShowUserDropdown(false);
                handleLogout();
              }}>
                <span style={{ marginRight: '0.5rem' }}>🚪</span> Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
