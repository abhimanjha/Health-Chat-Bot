import { FileText, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Resources = () => {
  const [resources] = useState([
    { id: 1, title: 'Managing Anxiety Daily', type: 'Article', category: 'Anxiety', status: 'Published' },
    { id: 2, title: 'Deep Breathing Guide', type: 'Exercise', category: 'Stress', status: 'Draft' },
    { id: 3, title: 'Crisis Hotlines 2024', type: 'Directory', category: 'Emergency', status: 'Published' },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText /> Mental Health Resources
          </h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Manage articles, exercises, and emergency directories.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '10px 20px',
          borderRadius: 'var(--radius)',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Plus size={18} /> Add Resource
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--muted)', textAlign: 'left' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Type</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Category</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 24px', fontWeight: '500' }}>{resource.title}</td>
                <td style={{ padding: '16px 24px' }}>{resource.type}</td>
                <td style={{ padding: '16px 24px' }}>{resource.category}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: resource.status === 'Published' ? 'rgba(34, 197, 94, 0.1)' : 'var(--muted)',
                    color: resource.status === 'Published' ? 'var(--success)' : 'var(--muted-foreground)'
                  }}>
                    {resource.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}>
                      <Edit2 size={18} />
                    </button>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--destructive)' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resources;
