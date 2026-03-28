import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // login | dashboard | add_task

  const handleLogin = (email) => {
    setUser(email);
    setCurrentView('dashboard');
  };

  const changeView = (view) => {
    setCurrentView(view);
  };

  if (!user || currentView === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} changeView={changeView} />
      
      <div className="main-wrapper">
        <Topbar currentView={currentView} />
        
        <main className="content-area">
          {currentView === 'dashboard' && <Dashboard changeView={changeView} />}
          {currentView === 'add_task' && <TaskForm changeView={changeView} />}
        </main>
      </div>
    </div>
  );
}

export default App;
