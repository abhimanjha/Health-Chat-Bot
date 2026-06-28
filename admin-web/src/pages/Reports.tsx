import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, PieChart } from 'lucide-react';

const Reports = () => {
  const data = [
    { name: 'Mon', sessions: 400 },
    { name: 'Tue', sessions: 300 },
    { name: 'Wed', sessions: 550 },
    { name: 'Thu', sessions: 450 },
    { name: 'Fri', sessions: 600 },
    { name: 'Sat', sessions: 800 },
    { name: 'Sun', sessions: 750 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PieChart /> Reports & Charts
          </h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Detailed historical analytics and exports.</p>
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
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        padding: '24px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Weekly AI Sessions</h3>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }} />
              <Bar dataKey="sessions" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
