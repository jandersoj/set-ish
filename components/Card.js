'use client';

export default function Card({ card, isSelected, onClick }) {
  const shapeSymbols = {
    diamond: '◆',
    squiggle: '≈',
    oval: '●',
  };

  const colorStyles = {
    red: '#e74c3c',
    green: '#2ecc71',
    purple: '#9b59b6',
  };

  const symbol = shapeSymbols[card.shape];
  const color = colorStyles[card.color];

  // Create the display (3 symbols if number is 3, etc)
  const symbols = Array(card.number).fill(symbol).join('  ');

  let textStyle = {};
  if (card.shading === 'solid') {
    textStyle = { color, fontWeight: 'bold' };
  } else if (card.shading === 'striped') {
    textStyle = { color, textDecoration: 'underline', textDecorationThickness: '2px' };
  } else if (card.shading === 'empty') {
    textStyle = { color, WebkitTextStroke: '1px ' + color, WebkitTextFillColor: 'white' };
  }

  return (
    <div
      onClick={() => onClick(card.id)}
      className="card"
      style={{
        border: isSelected ? '4px solid #3498db' : '2px solid #bdc3c7',
        backgroundColor: isSelected ? '#ebf5fb' : 'white',
      }}
    >
      <div style={{ ...textStyle, lineHeight: '1.2' }}>{symbols}</div>
    </div>
  );
}
