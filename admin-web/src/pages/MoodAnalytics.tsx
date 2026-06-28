import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useMockStore } from '../services/mockDataService';
import { BrainCircuit, TrendingUp } from 'lucide-react';

const MoodAnalytics = () => {
  const store = useMockStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BrainCircuit /> Mood Analytics
          </h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Population-level mood tracking and insights.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Average Mood Chart */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Average User Mood (Past 14 Days)
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={store.moodData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="averageMood" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis domain={[1, 5]} tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} tickMargin={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                  formatter={(value: number) => [value, 'Avg Mood']}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-ins Volume */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: 'var(--radius)',
          padding: '24px',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} /> Mood Check-in Volume
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={store.moodData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} tickMargin={10} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} tickMargin={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }} />
                <Area type="monotone" dataKey="totalCheckins" stroke="var(--primary)" fill="rgba(13, 148, 136, 0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodAnalytics;
