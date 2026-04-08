/**
 * mockTasks.js
 * Dữ liệu giả để phát triển UI trước khi có backend thật.
 * Cấu trúc Task phản ánh đúng schema API sẽ trả về.
 *
 * Schema:
 * {
 *   id          : string   — UUID
 *   title       : string
 *   description : string
 *   priority    : 'low' | 'medium' | 'high'
 *   project     : string
 *   tags        : string[]
 *   dueDate     : string | null   — 'YYYY-MM-DD'
 *   dueTime     : string | null   — 'HH:MM'
 *   completed   : boolean
 *   createdAt   : string          — ISO 8601
 *   completedAt : string | null   — ISO 8601
 * }
 */

const today = new Date();
const fmt = (d) => d.toISOString().split('T')[0]; // 'YYYY-MM-DD'

const d = (offsetDays) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + offsetDays);
  return fmt(dt);
};

/** @type {import('./types').Task[]} */
const mockTasks = [
  // ── Today's tasks ──────────────────────────────────────────────
  {
    id: 'task-001',
    title: 'Review Brand Editorial Pitch',
    description: 'Finalize the tone of voice guidelines for the Lumina project launch.',
    priority: 'high',
    project: 'Lumina',
    tags: ['Focus', 'Deep Work'],
    dueDate: d(0),
    dueTime: '10:30',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-002',
    title: 'Weekly Strategy Sync',
    description: 'Align quarterly goals with the product and design teams.',
    priority: 'medium',
    project: 'Work',
    tags: ['Strategy'],
    dueDate: d(0),
    dueTime: '14:00',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-003',
    title: 'Design System Audit',
    description: 'Review component library for consistency and accessibility.',
    priority: 'medium',
    project: 'Lumina',
    tags: ['Design'],
    dueDate: d(0),
    dueTime: '09:00',
    completed: true,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    completedAt: new Date().toISOString(),
  },
  {
    id: 'task-004',
    title: 'Write Q4 OKR Summary',
    description: 'Summarize progress on all key objectives for the quarter.',
    priority: 'high',
    project: 'Work',
    tags: ['Admin', 'Urgent'],
    dueDate: d(0),
    dueTime: '16:00',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    completedAt: null,
  },

  // ── Upcoming ────────────────────────────────────────────────────
  {
    id: 'task-005',
    title: 'Project Handoff: Zenith App',
    description: 'Hand off all design assets and documentation to the dev team.',
    priority: 'high',
    project: 'Zenith',
    tags: ['Focus'],
    dueDate: d(1),
    dueTime: '09:00',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-006',
    title: 'Yoga & Breathwork Session',
    description: 'Weekly wellness session at the studio.',
    priority: 'low',
    project: 'Health & Wellness',
    tags: ['Self-care'],
    dueDate: d(3),
    dueTime: '18:00',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-007',
    title: 'Quarterly Editorial Review',
    description: 'Full-day review of brand editorial direction for next quarter.',
    priority: 'high',
    project: 'Lumina',
    tags: ['Strategy', 'Deep Work'],
    dueDate: d(5),
    dueTime: null,
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-008',
    title: 'User Research Synthesis',
    description: 'Synthesize findings from 12 user interviews into actionable insights.',
    priority: 'medium',
    project: 'Side Project',
    tags: ['Research', 'Focus'],
    dueDate: d(7),
    dueTime: '11:00',
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-009',
    title: 'Update Portfolio Case Studies',
    description: 'Add three new case studies from recent client projects.',
    priority: 'low',
    project: 'Personal Development',
    tags: ['Creative'],
    dueDate: d(10),
    dueTime: null,
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-010',
    title: 'Read "Shape Up" by Basecamp',
    description: 'Finish the last 4 chapters and write a summary.',
    priority: 'low',
    project: 'Learning',
    tags: ['Admin'],
    dueDate: d(14),
    dueTime: null,
    completed: false,
    createdAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3).toISOString(),
    completedAt: null,
  },
];

export default mockTasks;
