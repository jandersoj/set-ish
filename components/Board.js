'use client';

import Card from './Card';

export default function Board({ cards, selectedCards, onSelectCard }) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isSelected={selectedCards.includes(card.id)}
          onClick={onSelectCard}
        />
      ))}
    </div>
  );
}
