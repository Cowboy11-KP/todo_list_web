import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskCard from '../components/TaskCard';

const Dashboard = ({ changeView }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header Info */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Monday, Oct 23
        </div>
        <h1 className="heading-xl">Good Morning, <em>Sarah.</em></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', lineHeight: 1.6 }}>
          You have 4 high-priority tasks curated for today. Focus on the editorial pitch first.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Left Column: Today Tasks */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Today</h2>
            <span className="pill pill-primary">4 Tasks</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Task 1 */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, border: '2px solid var(--lumina-teal)', marginTop: '2px', cursor: 'pointer' }}></div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Review Brand Editorial Pitch</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Finalize the tone of voice guidelines for the Lumina project launch.</p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span className="pill pill-primary" style={{ background: '#d5ece9', color: 'var(--lumina-teal)' }}>High Priority</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    🕒 10:30 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, border: '2px solid #b2c2bc', marginTop: '2px', cursor: 'pointer' }}></div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Weekly Strategy Sync</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                  <span className="pill pill-blue">Strategy</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    🕒 2:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Task 3 */}
            <div style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--lumina-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div style={{ opacity: 0.6 }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem', textDecoration: 'line-through' }}>Design System Audit</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span className="pill pill-neutral">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Upcoming & Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Upcoming Card */}
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem' }}>Upcoming</h3>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--lumina-teal)', textDecoration: 'none', fontWeight: 600 }}>View Calendar &gt;</a>
            </div>
            
            <div style={{ position: 'relative', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'var(--border-light)' }}></div>
              
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.5rem', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'white', border: '2px solid var(--lumina-teal)' }}></div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Tomorrow</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Project Handoff: Zenith App</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>9:00 AM — Main Studio</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.5rem', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'white', border: '2px solid #b2c2bc' }}></div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Wednesday, Oct 25</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Yoga & Breathwork Session</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>6:00 PM — Wellness Center</div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.5rem', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'white', border: '2px solid #b2c2bc' }}></div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Friday, Oct 27</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Quarterly Editorial Review</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>All Day</div>
              </div>
            </div>
          </div>

          {/* Focus Insight Card */}
          <div style={{ background: 'var(--insight-bg)', borderRadius: 'var(--radius-xl)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--lumina-teal)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM5 4L5.8 6.2L8 7L5.8 7.8L5 10L4.2 7.8L2 7L4.2 6.2L5 4Z"/>
              </svg>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>FOCUS INSIGHT</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--lumina-teal)', lineHeight: 1.6 }}>
              You are 15% more productive during your <strong>10:00 AM sessions</strong>. We've blocked your calendar for deep focus.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
