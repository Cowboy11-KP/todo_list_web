import React, { useState, useMemo } from 'react';
import useTasks from '../../hooks/useTasks';
import './CalendarView.css';

// --- Helpers ---
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // 0 = Mon, ..., 6 = Sun
};

const formatMonthYear = (date) => {
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
};

const formatDaySidebar = (date) => {
  const dStr = date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dayStr = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
  const today = new Date();
  let prefix = '';
  if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
    prefix = 'TODAY • ';
  }
  return { dateText: dStr, dayText: prefix + dayStr };
};

// Colors for randomizing pills
// Excludes dark text colors. We need light pill background and matching text colors.
const PILL_COLORS = [
  { bg: 'var(--pill-teal)', color: 'var(--lumina-teal)' },
  { bg: 'var(--pill-blue)', color: '#006080' },
  { bg: 'var(--pill-gray)', color: 'var(--text-main)' },
  { bg: '#ffe5e5', color: '#cc0000' },
  { bg: '#fff0cc', color: '#b37700' },
  { bg: '#e5ccff', color: '#5900b3' },
];

const getRandomColor = (str) => {
  if (!str) return PILL_COLORS[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PILL_COLORS.length;
  return PILL_COLORS[index];
};

const CalendarView = () => {
  const { tasks, loading } = useTasks();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleDateClick = (dayNum, isCurrentMonth = true) => {
    if (!isCurrentMonth) return; // For simplicity, ignore clicks on other months
    setSelectedDate(new Date(year, month, dayNum));
  };

  // Build Grid array
  const gridCells = useMemo(() => {
    const cells = [];
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    // Prev month filler
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ dayNum: prevMonthDays - i, isCurrentMonth: false });
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ dayNum: i, isCurrentMonth: true });
    }
    // Next month filler
    const remaining = 35 - cells.length; // 5 rows * 7 days
    for (let i = 1; i <= (remaining > 0 ? remaining : 42 - cells.length); i++) {
      cells.push({ dayNum: i, isCurrentMonth: false });
    }
    return cells;
  }, [year, month]);

  // Tasks organized by date string 'YYYY-MM-DD'
  const tasksByDate = useMemo(() => {
    const map = {};
    if (!tasks) return map;
    tasks.forEach(task => {
      if (!task.dueDate) return;
      if (!map[task.dueDate]) map[task.dueDate] = [];
      map[task.dueDate].push(task);
    });
    return map;
  }, [tasks]);

  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedTasks = [...(tasksByDate[selectedDateStr] || [])].sort((a,b) => (a.dueTime || '99:99').localeCompare(b.dueTime || '99:99'));
  
  const tasksThisMonth = useMemo(() => {
    if (!tasks) return 0;
    return tasks.filter(t => !t.completed && t.dueDate && t.dueDate.startsWith(`${year}-${String(month+1).padStart(2,'0')}`)).length;
  }, [tasks, year, month]);

  const sidebarLabels = formatDaySidebar(selectedDate);

  return (
    <div className="calendar-layout">
      {/* ── Main area (Left) ── */}
      <div className="calendar-main">
        <div className="calendar-header">
          <div className="calendar-title">
            <h1>{formatMonthYear(currentDate)}</h1>
            <p>{tasksThisMonth} TASKS REMAINING THIS MONTH</p>
          </div>
          <div className="calendar-nav">
            <button onClick={handlePrevMonth}>&lt;</button>
            <button className="nav-today" onClick={handleToday}>Today</button>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>

        <div className="calendar-grid-container">
          <div className="calendar-weekdays">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span>
            <span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
          <div className="calendar-days">
            {gridCells.map((cell, idx) => {
              const fullDateStr = cell.isCurrentMonth
                ? `${year}-${String(month + 1).padStart(2, '0')}-${String(cell.dayNum).padStart(2, '0')}`
                : '';
              
              const isSelected = cell.isCurrentMonth && 
                selectedDate.getDate() === cell.dayNum && 
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

              const cellTasks = fullDateStr ? (tasksByDate[fullDateStr] || []) : [];

              return (
                <div 
                  key={idx} 
                  className={`calendar-day ${!cell.isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateClick(cell.dayNum, cell.isCurrentMonth)}
                >
                  <span className="calendar-day-number">{cell.dayNum}</span>
                  
                  {/* Task Pills */}
                  {cellTasks.slice(0, 3).map(task => {
                    const colors = getRandomColor(task.id || task.title);
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`calendar-task ${isSelected ? 'selected-view' : ''}`}
                        style={!isSelected ? { backgroundColor: colors.bg, color: colors.color } : {}}
                      >
                        <div className="calendar-task-dot" />
                        {task.title.substring(0, 8)}...
                      </div>
                    )
                  })}
                  {cellTasks.length > 3 && (
                    <div className="calendar-task" style={{background: 'transparent', color: 'var(--text-muted)'}}>
                      +{cellTasks.length - 3} more
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Sidebar (Right) ── */}
      <div className="calendar-sidebar">
        
        {/* Daily Schedule */}
        <div className="daily-schedule">
          <div className="daily-schedule-header">
            <h2>{sidebarLabels.dateText}</h2>
            <p>{sidebarLabels.dayText}</p>
          </div>

          <div className="schedule-timeline">
            {loading ? (
              <p>Loading...</p>
            ) : selectedTasks.length === 0 ? (
              <p style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>No tasks scheduled.</p>
            ) : (
              selectedTasks.map((task, i) => (
                <div className="schedule-item" key={task.id}>
                  <div className={`schedule-dot ${task.completed ? 'faded' : ''}`} />
                  <div className="schedule-item-time">
                    {task.dueTime ? task.dueTime : 'All Day'}
                  </div>
                  <div className="schedule-item-title" style={{textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'inherited'}}>{task.title}</div>
                  
                  {task.description && (
                    <div className="schedule-item-desc">{task.description}</div>
                  )}

                  {/* Task Meta (Project/Tags) */}
                  {(task.project || (task.tags && task.tags.length > 0)) && (
                    <div className="schedule-item-meta">
                       {task.project && (
                         <div className="schedule-location">
                           <span>📍</span> {task.project}
                         </div>
                       )}
                       {task.tags && task.tags.map(tag => (
                         <span key={tag} className="pill pill-neutral">{tag}</span>
                       ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mindfulness Track (Mock) */}
        <div className="mindfulness-widget">
          <div className="mindfulness-header">
            <h3>Mindfulness Track</h3>
            <svg className="mindfulness-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M12 2v20A10 10 0 1 0 2 12h20M12 2A10 10 0 1 1 2 12" />
            </svg>
          </div>
          <div className="mindfulness-list">
            <div className="mindfulness-item checked">
              <div className="mindfulness-checkbox">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span>10m Morning Breathwork</span>
            </div>
            <div className="mindfulness-item">
              <div className="mindfulness-checkbox"></div>
              <span>Afternoon Tea Ceremony</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
