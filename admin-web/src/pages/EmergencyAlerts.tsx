import { AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { useMockStore } from '../services/mockDataService';
import { formatDistanceToNow } from 'date-fns';

const EmergencyAlerts = () => {
  const store = useMockStore();

  const handleAcknowledge = (id: string) => {
    store.acknowledgeAlert(id);
  };

  const handleResolve = (id: string) => {
    store.resolveAlert(id);
  };

  const activeAlerts = store.alerts.filter(a => a.status === 'new' || a.status === 'acknowledged');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Bell /> Emergency Alerts
          </h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Real-time monitoring of crisis alerts and system issues.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {activeAlerts.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', backgroundColor: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>All clear</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>There are no active emergency alerts right now.</p>
          </div>
        ) : (
          activeAlerts.map(alert => (
            <div key={alert.id} style={{
              backgroundColor: 'var(--card)',
              borderRadius: 'var(--radius)',
              padding: '24px',
              border: `1px solid ${alert.status === 'new' ? 'var(--destructive)' : 'var(--border)'}`,
              borderLeft: `4px solid ${alert.status === 'new' ? 'var(--destructive)' : '#eab308'}`,
              boxShadow: alert.status === 'new' ? '0 4px 12px rgba(239, 68, 68, 0.1)' : '0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  backgroundColor: alert.status === 'new' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <AlertTriangle size={24} color={alert.status === 'new' ? 'var(--destructive)' : '#eab308'} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: alert.status === 'new' ? 'var(--destructive)' : 'inherit' }}>
                    {alert.message}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                    Type: {alert.type.toUpperCase()} • {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {alert.status === 'new' && (
                  <button 
                    onClick={() => handleAcknowledge(alert.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--muted)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Acknowledge
                  </button>
                )}
                <button 
                  onClick={() => handleResolve(alert.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: 'var(--success)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Resolve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
