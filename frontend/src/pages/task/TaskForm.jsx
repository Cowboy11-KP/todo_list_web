import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../../hooks/useTasks';
import './TaskForm.css';

const PROJECTS = ['Personal Development', 'Work', 'Health & Wellness', 'Side Project', 'Learning'];
const TAG_OPTIONS = ['Focus', 'Deep Work', 'Urgent', 'Creative', 'Admin'];

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, createTask, updateTask } = useTasks();
  const isEditing = !!id;

  const [status, setStatus] = useState({ type: '', message: '' });

  // ── Core fields ──────────────────────────────────────────────
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');

  // ── Schedule ─────────────────────────────────────────────────
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const dateInputRef    = useRef(null);
  const timeInputRef    = useRef(null);

  // ── Priority ─────────────────────────────────────────────────
  const [priority, setPriority] = useState('medium'); // low | medium | high

  // ── Project ──────────────────────────────────────────────────
  const [project, setProject] = useState(PROJECTS[0]);

  // ── Tags ─────────────────────────────────────────────────────
  const [tags, setTags]           = useState(['Focus', 'Deep Work']);
  const [addingTag, setAddingTag] = useState(false);
  const [tagInput, setTagInput]   = useState('');

  // ── Handlers ─────────────────────────────────────────────────
  useEffect(() => {
    if (isEditing && tasks.length > 0) {
      const t = tasks.find(x => x.id === id);
      if (t) {
        setTitle(t.title || '');
        setDescription(t.description || '');
        setDate(t.dueDate || '');
        setTime(t.dueTime || '');
        setPriority(t.priority || 'medium');
        setProject(t.project || PROJECTS[0]);
        setTags(t.tags || []);
      }
    }
  }, [id, tasks, isEditing]);

  const handleSave = async () => {
    const taskData = { title, description, dueDate: date, dueTime: time, priority, project, tags };
    setStatus({ type: 'loading', message: 'Đang lưu...' });
    try {
      if (isEditing) {
        await updateTask(id, taskData);
      } else {
        await createTask(taskData); 
      }
      setStatus({ type: 'success', message: isEditing ? 'Cập nhật thành công!' : 'Tạo mới thành công!' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Lỗi khi lưu task:', err);
      setStatus({ type: 'error', message: err.message || 'Có lỗi xảy ra khi lưu task!' });
    }
  };

  const removeTag = (tag) => setTags(tags.filter(t => t !== tag));

  const confirmTag = (e) => {
    if ((e.key === 'Enter' || e.type === 'blur') && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput('');
      setAddingTag(false);
    } else if (e.key === 'Escape') {
      setTagInput('');
      setAddingTag(false);
    }
  };

  // Format date for display
  const formatDate = (d) => {
    if (!d) return 'mm/dd/yyyy';
    const [y, m, day] = d.split('-');
    return `${m}/${day}/${y}`;
  };

  const formatTime = (t) => {
    if (!t) return '-- : --';
    const [h, min] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${min} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const priorityClass = (level) => {
    if (priority === level) return `priority-btn active-${level}`;
    return 'priority-btn';
  };

  return (
    <div className="task-form-page">
      <div className="task-form-card">

        {status.message && (
          <div className={`status-banner status-${status.type}`}>
            {status.message}
            {status.type === 'error' && (
              <button className="status-close" onClick={() => setStatus({ type: '', message: '' })}>×</button>
            )}
          </div>
        )}

        {/* ── Title ── */}
        <div className="title-group">
          <div className="field-label">Task Title</div>
          <input
            type="text"
            className="title-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        {/* ── Description ── */}
        <div className="desc-group">
          <div className="field-label">Description</div>
          <textarea
            className="desc-textarea"
            placeholder="Add notes or details for this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* ── Options Grid ── */}
        <div className="options-grid">

          {/* SCHEDULE */}
          <div className="option-block">
            <div className="option-block__header">
              <span>📅</span> SCHEDULE
            </div>
            <div className="schedule-row">

              {/* Date — click anywhere trên ô mở date picker */}
              <div className="schedule-field" onClick={() => dateInputRef.current?.showPicker?.()}>
                <input
                  ref={dateInputRef}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  tabIndex={-1}
                />
                <div className={`schedule-display ${date ? 'has-value' : ''}`}>
                  <span>{formatDate(date)}</span>
                  <span>📅</span>
                </div>
              </div>

              {/* Time — click icon ⏱️ mở time picker */}
              <div className="schedule-field">
                <input
                  ref={timeInputRef}
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  tabIndex={-1}
                />
                <div className={`schedule-display ${time ? 'has-value' : ''}`}>
                  <span>{formatTime(time)}</span>
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => timeInputRef.current?.showPicker?.()}
                  >⏱️</span>
                </div>
              </div>

            </div>
          </div>

          {/* PRIORITY */}
          <div className="option-block">
            <div className="option-block__header">
              <span>❗</span> PRIORITY
            </div>
            <div className="priority-toggle">
              <button className={priorityClass('low')}    onClick={() => setPriority('low')}>Low</button>
              <button className={priorityClass('medium')} onClick={() => setPriority('medium')}>Medium</button>
              <button className={priorityClass('high')}   onClick={() => setPriority('high')}>High</button>
            </div>
          </div>

          {/* PROJECT */}
          <div className="option-block">
            <div className="option-block__header">
              <span>🔺</span> PROJECT
            </div>
            <div className="project-select-wrapper">
              <select value={project} onChange={(e) => setProject(e.target.value)}>
                {PROJECTS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <span className="select-chevron">⌄</span>
            </div>
          </div>

          {/* TAGS */}
          <div className="option-block">
            <div className="option-block__header">
              <span>🏷️</span> TAGS
            </div>
            <div className="tags-row">
              {tags.map((tag, i) => (
                <span
                  key={tag}
                  className={`tag-pill ${['tag-pill--teal', 'tag-pill--blue', 'tag-pill--rose'][i % 3]}`}
                  onClick={() => removeTag(tag)}
                  title="Click để xóa"
                >
                  {tag} ×
                </span>
              ))}

              {addingTag ? (
                <input
                  className="tag-input"
                  autoFocus
                  placeholder="Tag name..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={confirmTag}
                  onBlur={confirmTag}
                />
              ) : (
                <button className="tag-add-btn" onClick={() => setAddingTag(true)} title="Thêm tag">
                  +
                </button>
              )}
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className="form-divider" />

        {/* ── Actions ── */}
        <div className="form-actions">
          <button className="form-actions__discard" onClick={() => navigate(-1)}>
            <span>🗑️</span> Discard
          </button>
          <div className="form-actions__right">
            <button className="btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
            <button className="btn-primary"   onClick={handleSave}>{isEditing ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </div>

      </div>

      {/* ── Keyboard Hints ── */}
      <div className="keyboard-hints">
        <div className="keyboard-hints__item">
          <span className="kbd">ESC</span> TO CLOSE
        </div>
        <div className="keyboard-hints__item">
          <span className="kbd">⌘ + S</span> QUICK SAVE
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
