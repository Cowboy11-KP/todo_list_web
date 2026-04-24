import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';
import './Dashboard.css';

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Format 'YYYY-MM-DD' → 'Monday, Apr 7' */
const formatDateLabel = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

/** Format 'HH:MM' → '10:30 AM' */
const formatTime = (t) => {
  if (!t) return null;
  const [h, min] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(min).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

/** dueDate relative label cho upcoming */
const relativeDateLabel = (dateStr) => {
  const today   = new Date(); today.setHours(0, 0, 0, 0);
  const target  = new Date(dateStr + 'T00:00:00');
  const diffDay = Math.round((target - today) / 86_400_000);
  if (diffDay === 1) return 'Tomorrow';
  return target.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
};

const PRIORITY_CLASS = { high: 'pill-danger', medium: 'pill-primary', low: 'pill-neutral' };
const PRIORITY_LABEL = { high: 'High Priority', medium: 'Medium', low: 'Low' };

const greetingByHour = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

// ─── Sub-components ────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LoadingState = () => (
  <div className="dashboard__loading">
    <div className="dashboard__loading-spinner" />
    <span>Loading tasks…</span>
  </div>
);

const EmptyToday = () => (
  <div className="dashboard__empty">
    <span className="dashboard__empty-icon">✨</span>
    <p>No tasks scheduled for today.</p>
    <Link to="/tasks/new" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
      + Add a task
    </Link>
  </div>
);

// ─── Task Card (Today) ─────────────────────────────────────────────────────

const TodayTaskCard = ({ task, onToggle, onClick }) => {
  const done = task.completed;

  return (
    <div className={`task-card ${done ? 'task-card--completed' : ''}`}>
      <button
        className={`task-card__checkbox ${done ? 'task-card__checkbox--done' : ''} ${!done && task.priority === 'low' ? 'task-card__checkbox--muted' : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done && <CheckIcon />}
      </button>

      <div className={`task-card__body ${done ? 'task-card__body--faded' : ''}`} onClick={onClick} style={{ cursor: 'pointer' }}>
        <h3 className={`task-card__title ${done ? 'task-card__title--strikethrough' : ''}`}>
          {task.title}
        </h3>

        {task.description && !done && (
          <p className="task-card__description">{task.description}</p>
        )}

        <div className={`task-card__meta ${done ? 'task-card__meta--tight' : ''}`}>
          {done ? (
            <span className="pill pill-neutral">Completed</span>
          ) : (
            <>
              <span className={`pill ${PRIORITY_CLASS[task.priority]}`}>
                {PRIORITY_LABEL[task.priority]}
              </span>
              {task.due_time && (
                <span className="task-card__time">🕒 {formatTime(task.due_time)}</span>
              )}
              {task.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="pill pill-neutral">{tag}</span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Dashboard ─────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();
  const { todayTasks, upcomingTasks, todayStats, loading, error, toggleTask } = useTasks();

  const todayLabel = formatDateLabel(new Date().toISOString().split('T')[0]);

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <div className="dashboard__header">
        <div className="dashboard__date-label">{todayLabel}</div>
        <h1 className="heading-xl">{greetingByHour()}, <em>Sarah.</em></h1>
        <p className="dashboard__subtitle">
          {loading
            ? 'Loading your curated tasks…'
            : todayStats.highPrio > 0
              ? `You have ${todayStats.highPrio} high-priority task${todayStats.highPrio > 1 ? 's' : ''} for today. Stay focused.`
              : todayStats.total > 0
                ? `You have ${todayStats.total - todayStats.done} task${(todayStats.total - todayStats.done) !== 1 ? 's' : ''} remaining today.`
                : 'All caught up for today. Great work!'}
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="dashboard__grid">

        {/* ── Left Column: Today ── */}
        <div>
          <div className="dashboard__tasks-header">
            <h2>Today</h2>
            {!loading && (
              <span className="pill pill-primary">
                {todayStats.total - todayStats.done}/{todayStats.total} Tasks
              </span>
            )}
          </div>

          {error && <p className="dashboard__error">⚠ {error}</p>}

          {loading ? (
            <LoadingState />
          ) : todayTasks.length === 0 ? (
            <EmptyToday />
          ) : (
            <div className="dashboard__task-list">
              {/* Active tasks first */}
              {todayTasks
                .filter((t) => !t.completed)
                .sort((a, b) => (a.due_time ?? '99:99').localeCompare(b.due_time ?? '99:99'))
                .map((task) => (
                  <TodayTaskCard key={task.id} task={task} onToggle={toggleTask} onClick={() => navigate(`/tasks/${task.id}`)} />
                ))}
              {/* Completed tasks at bottom */}
              {todayTasks
                .filter((t) => t.completed)
                .map((task) => (
                  <TodayTaskCard key={task.id} task={task} onToggle={toggleTask} onClick={() => navigate(`/tasks/${task.id}`)} />
                ))}
            </div>
          )}

          View all tasks link
          {!loading && todayTasks.length > 0 && (
            <button
              className="dashboard__view-all"
              onClick={() => navigate('/tasks')}
            >
              View all tasks →
            </button>
          )}
        </div>

        {/* ── Right Column ── */}
        <div className="dashboard__sidebar">

          {/* Upcoming Card */}
          <div className="upcoming-card">
            <div className="upcoming-card__header">
              <h3 className="upcoming-card__title">Upcoming Schedule</h3>
              <Link to="/upcoming" className="upcoming-card__link">View calendar &gt;</Link>
            </div>

            <div className="timeline">
              <div className="timeline__line" />
              {loading ? (
                <LoadingState />
              ) : upcomingTasks.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  No upcoming tasks. 🎉
                </p>
              ) : (
                upcomingTasks.slice(0, 4).map((task, i) => (
                  <div key={task.id} className="timeline__item" style={{ cursor: 'pointer' }} onClick={() => navigate(`/tasks/${task.id}`)}>
                    <div className={`timeline__dot ${task.completed ? 'timeline__dot--muted' : ''}`} />
                    <div className="timeline__date">{task.due_time ? formatTime(task.due_time) : 'All Day'}</div>
                    <div className="timeline__event-title" style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'inherit' }}>{task.title}</div>
                    <div className="timeline__event-sub">
                      {task.project}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Focus Insight Card */}
          <div className="insight-card">
            <div className="insight-card__header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM5 4L5.8 6.2L8 7L5.8 7.8L5 10L4.2 7.8L2 7L4.2 6.2L5 4Z" />
              </svg>
              <span className="insight-card__label">FOCUS INSIGHT</span>
            </div>
            <p className="insight-card__text">
              {todayStats.done > 0
                ? <>You've completed <strong>{todayStats.done} task{todayStats.done > 1 ? 's' : ''}</strong> today. Keep the momentum going!</>
                : <>You are 15% more productive during your <strong>10:00 AM sessions</strong>. We've blocked your calendar for deep focus.</>}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
