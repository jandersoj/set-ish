'use client';

export default function Deck({ remaining, found }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        fontSize: '1.1rem',
        color: 'white',
      }}
    >
      <div>
        Cards in deck: <strong>{remaining}</strong>
      </div>
      <div>
        Found sets: <strong>{found}</strong>
      </div>
    </div>
  );
}
