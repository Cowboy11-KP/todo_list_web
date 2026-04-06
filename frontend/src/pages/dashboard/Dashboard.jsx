import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header Info */}
      <div className="dashboard__header">
        <div className="dashboard__date-label">Monday, Oct 23</div>
        <h1 className="heading-xl">Good Morning, <em>Sarah.</em></h1>
        <p className="dashboard__subtitle">
          You have 4 high-priority tasks curated for today. Focus on the editorial pitch first.
        </p>
      </div>

      {/* Main Grid */}
      <div className="dashboard__grid">

        {/* Left Column: Today Tasks */}
        <div>
          <div className="dashboard__tasks-header">
            <h2>Today</h2>
            <span className="pill pill-primary">4 Tasks</span>
          </div>

          <div className="dashboard__task-list">
            {/* Task 1 */}
            <div className="task-card">
              <div className="task-card__checkbox"></div>
              <div className="task-card__body">
                <h3 className="task-card__title">Review Brand Editorial Pitch</h3>
                <p className="task-card__description">
                  Finalize the tone of voice guidelines for the Lumina project launch.
                </p>
                <div className="task-card__meta">
                  <span className="pill pill-primary pill--high-priority">High Priority</span>
                  <span className="task-card__time">🕒 10:30 AM</span>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className="task-card">
              <div className="task-card__checkbox task-card__checkbox--muted"></div>
              <div className="task-card__body">
                <h3 className="task-card__title">Weekly Strategy Sync</h3>
                <div className="task-card__meta">
                  <span className="pill pill-blue">Strategy</span>
                  <span className="task-card__time">🕒 2:00 PM</span>
                </div>
              </div>
            </div>

            {/* Task 3 — Completed */}
            <div className="task-card task-card--completed">
              <div className="task-card__checkbox task-card__checkbox--done">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div className="task-card__body task-card__body--faded">
                <h3 className="task-card__title task-card__title--strikethrough">Design System Audit</h3>
                <div className="task-card__meta task-card__meta--tight">
                  <span className="pill pill-neutral">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming & Insights */}
        <div className="dashboard__sidebar">

          {/* Upcoming Card */}
          <div className="upcoming-card">
            <div className="upcoming-card__header">
              <h3 className="upcoming-card__title">Upcoming</h3>
              <Link to="/upcoming" className="upcoming-card__link">View Calendar &gt;</Link>
            </div>

            <div className="timeline">
              {/* Timeline line */}
              <div className="timeline__line"></div>

              <div className="timeline__item">
                <div className="timeline__dot"></div>
                <div className="timeline__date">Tomorrow</div>
                <div className="timeline__event-title">Project Handoff: Zenith App</div>
                <div className="timeline__event-sub">9:00 AM — Main Studio</div>
              </div>

              <div className="timeline__item">
                <div className="timeline__dot timeline__dot--muted"></div>
                <div className="timeline__date">Wednesday, Oct 25</div>
                <div className="timeline__event-title">Yoga & Breathwork Session</div>
                <div className="timeline__event-sub">6:00 PM — Wellness Center</div>
              </div>

              <div className="timeline__item">
                <div className="timeline__dot timeline__dot--muted"></div>
                <div className="timeline__date">Friday, Oct 27</div>
                <div className="timeline__event-title">Quarterly Editorial Review</div>
                <div className="timeline__event-sub">All Day</div>
              </div>
            </div>
          </div>

          {/* Focus Insight Card */}
          <div className="insight-card">
            <div className="insight-card__header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM5 4L5.8 6.2L8 7L5.8 7.8L5 10L4.2 7.8L2 7L4.2 6.2L5 4Z"/>
              </svg>
              <span className="insight-card__label">FOCUS INSIGHT</span>
            </div>
            <p className="insight-card__text">
              You are 15% more productive during your <strong>10:00 AM sessions</strong>. We've blocked your calendar for deep focus.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
