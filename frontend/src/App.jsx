import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TaskForm from './pages/task/TaskForm';
import TaskDetail from './pages/task/TaskDetail';
import CalendarView from './pages/calendar/CalendarView';
import Archive from './pages/archive/Archive';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './index.css';

// Layout dùng chung cho các trang sau khi login
const AppLayout = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-wrapper">
      <Topbar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Trang login — không có sidebar/topbar */}
      <Route path="/login" element={<Login />} />

      {/* Các trang chính — có layout chung */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<CalendarView />} />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route path="/tasks/:id/edit" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/upcoming" element={<CalendarView />} />
        <Route path="/archive" element={<Archive />} />
      </Route>

      {/* Mặc định chuyển đến login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
