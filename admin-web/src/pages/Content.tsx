import { Plus, Edit2, Trash2 } from 'lucide-react';

const Content = () => {
  const tips = [
    { id: 1, title: 'Stay Hydrated', category: 'Wellness', status: 'Published' },
    { id: 2, title: 'Prioritize Sleep', category: 'Health', status: 'Published' },
    { id: 3, title: 'Get Sunlight', category: 'Wellness', status: 'Draft' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Content Management</h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Manage app content like Health Tips and FAQs.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Plus size={18} /> New Tip
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {tips.map((tip) => (
          <div key={tip.id} style={{
            backgroundColor: 'var(--card)',
            padding: '20px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ 
                backgroundColor: 'var(--muted)', 
                padding: '4px 10px', 
                borderRadius: '20px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>{tip.category}</span>
              <span style={{ 
                color: tip.status === 'Published' ? 'var(--success)' : 'var(--warning)',
                fontSize: '13px',
                fontWeight: '500'
              }}>• {tip.status}</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>{tip.title}</h3>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button style={{ flex: 1, padding: '8px', borderRadius: '6px', backgroundColor: 'var(--muted)', fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                <Edit2 size={16} /> Edit
              </button>
              <button style={{ padding: '8px 12px', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--destructive)' }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
