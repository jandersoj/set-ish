'use client';

export default function SetCheck({ message, visible }) {
  if (!visible) return null;

  const isValid = message === 'Set found!';
  
  return (
    <div
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: isValid ? '#005523' : '#a52a1c',
        animation: 'fadeInOut 1s ease-in-out',
      }}
    >
      {message}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
