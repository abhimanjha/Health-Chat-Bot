import { Search, MoreVertical } from 'lucide-react';
import { useMockStore } from '../services/mockDataService';
import { formatDistanceToNow } from 'date-fns';

const Users = () => {
  const store = useMockStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Users</h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Manage user accounts and permissions.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
          padding: '10px 20px',
          borderRadius: 'var(--radius)',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}>
          Export Data
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            width: '300px'
          }}>
            <Search size={18} color="var(--muted-foreground)" />
            <input 
              type="text" 
              placeholder="Search users..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
            />
          </div>
          <select style={{
            padding: '10px 16px',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            outline: 'none'
          }}>
            <option>All Roles</option>
            <option>Admin</option>
            <option>User</option>
          </select>
          <select style={{
            padding: '10px 16px',
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            outline: 'none'
          }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--muted)', textAlign: 'left' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Name</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Role</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Joined</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}>Last Active</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', color: 'var(--muted-foreground)' }}></th>
            </tr>
          </thead>
          <tbody>
            {store.users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontWeight: '500' }}>{user.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>{user.email}</div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.1)' : user.status === 'blocked' ? 'rgba(239, 68, 68, 0.1)' : 'var(--muted)',
                    color: user.status === 'active' ? 'var(--success)' : user.status === 'blocked' ? 'var(--destructive)' : 'var(--muted-foreground)'
                  }}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textTransform: 'capitalize' }}>{user.role}</td>
                <td style={{ padding: '16px 24px', color: 'var(--muted-foreground)' }}>
                  {formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true })}
                </td>
                <td style={{ padding: '16px 24px', color: 'var(--muted-foreground)' }}>
                  {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}>
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
