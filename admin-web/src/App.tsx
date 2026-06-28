import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Conversations from './pages/Conversations';
import MoodAnalytics from './pages/MoodAnalytics';
import Resources from './pages/Resources';
import EmergencyAlerts from './pages/EmergencyAlerts';
import Feedback from './pages/Feedback';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto', height: '100vh' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/mood" element={<MoodAnalytics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/alerts" element={<EmergencyAlerts />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
