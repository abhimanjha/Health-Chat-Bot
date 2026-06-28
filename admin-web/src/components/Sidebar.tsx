import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Activity, 
  MessageSquare, 
  BrainCircuit, 
  Bell, 
  MessageCircle, 
  PieChart 
} from 'lucide-react';
import { useMockStore } from '../services/mockDataService';

const Sidebar = () => {
  const store = useMockStore();
  const unhandledAlerts = store.alerts.filter(a => a.status === 'new').length;

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--card)',
      borderRight: '1px solid var(--border)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 12px' }}>
        <div style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '8px',
          borderRadius: '12px'
        }}>
          <Activity size={24} />
        </div>
        <h1 style={{ fontSize: '20px', fontWeight: '700' }}>HealthAI Admin</h1>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/users" icon={<Users size={20} />} label="Users" />
        <NavItem to="/conversations" icon={<MessageSquare size={20} />} label="Conversations" />
        <NavItem to="/mood" icon={<BrainCircuit size={20} />} label="Mood Analytics" />
        <NavItem to="/resources" icon={<FileText size={20} />} label="Resources" />
        
        <div style={{ marginTop: '12px', marginBottom: '4px', paddingLeft: '12px', fontSize: '12px', fontWeight: '600', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Monitoring & Reports
        </div>
        
        <NavItem 
          to="/alerts" 
          icon={<Bell size={20} />} 
          label="Alerts" 
          badge={unhandledAlerts > 0 ? unhandledAlerts : undefined} 
        />
        <NavItem to="/feedback" icon={<MessageCircle size={20} />} label="Feedback" />
        <NavItem to="/reports" icon={<PieChart size={20} />} label="Reports" />
      </nav>
      
      <div style={{ marginTop: 'auto' }}>
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, badge }: { to: string, icon: React.ReactNode, label: string, badge?: number }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: '12px',
        color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
        backgroundColor: isActive ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        textDecoration: 'none'
      })}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span style={{
          backgroundColor: 'var(--destructive)',
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '2px 8px',
          borderRadius: '999px'
        }}>
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;
