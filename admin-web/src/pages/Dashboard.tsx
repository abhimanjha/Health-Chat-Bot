import { Users, Activity, AlertCircle, MessageSquare } from 'lucide-react';
import { useMockStore } from '../services/mockDataService';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const store = useMockStore();

  const activeConversations = store.conversations.filter(c => c.status === 'active').length;
  const newAlerts = store.alerts.filter(a => a.status === 'new').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Dashboard Overview</h2>
        <p style={{ color: 'var(--muted-foreground)' }}>Real-time metrics and system health.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <StatCard title="Total Users" value={store.users.length.toString()} icon={<Users />} trend="Live Data" />
        <StatCard title="Active Users (Online)" value={store.activeUsersCount.toString()} icon={<Activity />} trend="Fluctuating" />
        <StatCard title="Active AI Sessions" value={activeConversations.toString()} icon={<MessageSquare />} trend="Ongoing" />
        <StatCard title="Unresolved Alerts" value={newAlerts.toString()} icon={<AlertCircle color={newAlerts > 0 ? "var(--destructive)" : "var(--muted-foreground)"} />} trend={newAlerts > 0 ? "Requires Attention" : "All Good"} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Recent Alerts Panel */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={20} /> Recent Alerts
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {store.alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ 
                  width: '12px', height: '12px', borderRadius: '50%', marginTop: '6px',
                  backgroundColor: alert.status === 'new' ? 'var(--destructive)' : alert.status === 'acknowledged' ? '#eab308' : 'var(--success)' 
                }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '500', color: alert.status === 'new' ? 'var(--destructive)' : 'inherit' }}>{alert.message}</p>
                  <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>Type: {alert.type} | Severity: {alert.severity}</p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </span>
              </div>
            ))}
            {store.alerts.length === 0 && <p style={{ color: 'var(--muted-foreground)' }}>No alerts to show.</p>}
          </div>
        </div>

        {/* Live Active Conversations */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} /> Live AI Sessions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {store.conversations.filter(c => c.status === 'active').slice(0, 5).map((conv) => (
              <div key={conv.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '500' }}>{conv.anonymizedName}</p>
                  <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                    Risk: <span style={{ color: conv.riskLevel === 'high' ? 'var(--destructive)' : conv.riskLevel === 'medium' ? '#eab308' : 'var(--success)' }}>{conv.riskLevel}</span> 
                    {' '}• {conv.messagesCount} messages
                  </p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
                  Started {formatDistanceToNow(new Date(conv.startedAt), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) => (
  <div style={{
    backgroundColor: 'var(--card)',
    padding: '24px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted-foreground)' }}>
      <span style={{ fontWeight: '500' }}>{title}</span>
      {icon}
    </div>
    <div style={{ fontSize: '32px', fontWeight: '700' }}>{value}</div>
    <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>{trend}</div>
  </div>
);

export default Dashboard;
