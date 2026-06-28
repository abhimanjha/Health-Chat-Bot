import { MessageCircle, Star } from 'lucide-react';

const Feedback = () => {
  const feedbacks = [
    { id: 1, user: 'User #102', rating: 5, comment: 'The AI was incredibly helpful and understanding.', date: '2 hours ago' },
    { id: 2, user: 'User #883', rating: 3, comment: 'Good, but sometimes the responses feel a bit robotic.', date: '5 hours ago' },
    { id: 3, user: 'User #492', rating: 4, comment: 'Really liked the mood tracking feature.', date: '1 day ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageCircle /> User Feedback
        </h2>
        <p style={{ color: 'var(--muted-foreground)' }}>Review ratings and comments from users.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {feedbacks.map(fb => (
          <div key={fb.id} style={{
            backgroundColor: 'var(--card)',
            padding: '24px',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontWeight: '600' }}>{fb.user}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={16} 
                    fill={star <= fb.rating ? '#eab308' : 'none'} 
                    color={star <= fb.rating ? '#eab308' : 'var(--muted-foreground)'} 
                  />
                ))}
              </div>
            </div>
            <p style={{ color: 'var(--foreground)', marginBottom: '16px', lineHeight: '1.5' }}>
              "{fb.comment}"
            </p>
            <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
              {fb.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
