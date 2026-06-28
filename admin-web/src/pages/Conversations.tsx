import { MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { useMockStore } from '../services/mockDataService';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const Conversations = () => {
  const store = useMockStore();
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  const activeConversations = store.conversations.filter(c => c.status === 'active');
  const selectedConv = store.conversations.find(c => c.id === selectedConvId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 100px)' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageSquare /> AI Conversation Monitoring
        </h2>
        <p style={{ color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} /> Privacy Mode Active: Personally Identifiable Information (PII) is hidden.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar List */}
        <div style={{ 
          width: '350px', 
          backgroundColor: 'var(--card)', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: '600' }}>
            Active Sessions ({activeConversations.length})
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {activeConversations.map(conv => (
              <div 
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                style={{ 
                  padding: '16px', 
                  borderBottom: '1px solid var(--border)', 
                  cursor: 'pointer',
                  backgroundColor: selectedConvId === conv.id ? 'var(--muted)' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>{conv.anonymizedName}</span>
                  {conv.riskLevel === 'high' && <AlertTriangle size={16} color="var(--destructive)" />}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted-foreground)' }}>
                  Started {formatDistanceToNow(new Date(conv.startedAt), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Detail View */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'var(--card)', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {selectedConv ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Session {selectedConv.id}</h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '14px' }}>Participant: {selectedConv.anonymizedName}</p>
                </div>
                <div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: selectedConv.riskLevel === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'var(--muted)',
                    color: selectedConv.riskLevel === 'high' ? 'var(--destructive)' : 'var(--muted-foreground)'
                  }}>
                    {selectedConv.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>
              
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                  <div style={{ backgroundColor: 'var(--muted)', padding: '12px 16px', borderRadius: '12px 12px 12px 0' }}>
                    I've been feeling really overwhelmed lately with work.
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '4px' }}>User - 10 mins ago</div>
                </div>

                <div style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
                  <div style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)', padding: '12px 16px', borderRadius: '12px 12px 0 12px' }}>
                    I'm sorry to hear that you're feeling overwhelmed. It's completely normal to feel that way when work piles up. Have you been able to take any breaks?
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '4px', textAlign: 'right' }}>AI - 9 mins ago</div>
                </div>

                <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
                  <div style={{ backgroundColor: 'var(--muted)', padding: '12px 16px', borderRadius: '12px 12px 12px 0' }}>
                    Not really. My boss [REDACTED PII] just keeps giving me more tasks.
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted-foreground)', marginTop: '4px' }}>User - Just now</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--muted-foreground)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <MessageSquare size={48} style={{ opacity: 0.2 }} />
              <p>Select an active session to monitor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
