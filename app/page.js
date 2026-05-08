'use client';

import { useState, useEffect } from 'react';
import Card from '../components/Card.js';
import Board from '../components/Board.js';
import SetCheck from '../components/SetCheck.js';
import Deck from '../components/Deck.js';

// ===== MAIN GAME COMPONENT =====
export default function Home() {
  const [deck, setDeck] = useState([]);
  const [board, setBoard] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [foundSets, setFoundSets] = useState(0);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Initialize game on mount
  useEffect(() => {
    const newDeck = generateDeck();
    const initialBoard = newDeck.slice(0, 12);
    const remainingDeck = newDeck.slice(12);

    setDeck(remainingDeck);
    setBoard(initialBoard);
  }, []);

  // Auto-check when 3 cards are selected
  useEffect(() => {
    if (selectedCards.length === 3) {
      const selected = selectedCards.map((id) =>
        board.find((card) => card.id === id)
      );

      if (isValidSet(selected[0], selected[1], selected[2])) {
        // Valid set found!
        setMessage('Set found!');
        setShowMessage(true);

        // Remove selected cards from board and deal new ones
        setTimeout(() => {
          const newBoard = board.filter(
            (card) => !selectedCards.includes(card.id)
          );

          // Deal 3 new cards from deck
          if (deck.length > 0) {
            const cardsToAdd = deck.slice(0, 3);
            const newDeck = deck.slice(3);
            setBoard([...newBoard, ...cardsToAdd]);
            setDeck(newDeck);
          } else {
            setBoard(newBoard);
          }

          // Update score and clear selection
          setFoundSets(foundSets + 1);
          setSelectedCards([]);
          setShowMessage(false);
        }, 3000); // Wait for message animation
      } else {
        // Not a set
        setMessage('Not a set');
        setShowMessage(true);

        // Auto-unselect after 1.5 seconds
        setTimeout(() => {
          setSelectedCards([]);
          setShowMessage(false);
        }, 1500);
      }
    }
  }, [selectedCards, board, deck, foundSets]);

  const handleSelectCard = (cardId) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else if (selectedCards.length < 3) {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const handleNoSet = () => {
    if (hasSetOnBoard(board)) {
      setMessage('there is at least one possible set');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } else {
      // No set on board - deal 3 more cards
      if (deck.length >= 3) {
        const cardsToAdd = deck.slice(0, 3);
        const newDeck = deck.slice(3);
        setBoard([...board, ...cardsToAdd]);
        setDeck(newDeck);
        setMessage('No sets found. Dealing 3 more cards.');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else if (deck.length > 0) {
        // Fewer than 3 cards left, deal what we can
        const cardsToAdd = deck.slice(0, deck.length);
        setBoard([...board, ...cardsToAdd]);
        setDeck([]);
        setMessage(`No sets found. Dealt ${cardsToAdd.length} remaining cards.`);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } else {
        setMessage('No sets found. No cards left in deck.');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="main-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}> def not SET, just SET inspired. </h1>

        <Deck remaining={deck.length} found={foundSets} />

        <div style={{ color: 'white', fontSize: '1rem' }}>
          Selected: {selectedCards.length} / 3
        </div>

        <button
          onClick={handleNoSet}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#463086',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            width: '100%',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#614d9e')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#463086')}
        >
          No Set?
        </button>

        <SetCheck message={message} visible={showMessage} />
      </div>

      {/* Center Board */}
      <div className="board-container">
        <Board cards={board} selectedCards={selectedCards} onSelectCard={handleSelectCard} />
      </div>

      {/* Right Sidebar (empty for now) */}
      <div className="sidebar" />
    </div>
  );
}

// ===== UTILITY FUNCTIONS =====

function generateDeck() {
  const shapes = ['diamond', 'squiggle', 'oval'];
  const colors = ['red', 'green', 'purple'];
  const numbers = [1, 2, 3];
  const shadings = ['solid', 'striped', 'empty'];

  let cardId = 0;
  const deck = [];

  for (let shape of shapes) {
    for (let color of colors) {
      for (let number of numbers) {
        for (let shading of shadings) {
          deck.push({
            id: cardId++,
            shape,
            color,
            number,
            shading,
          });
        }
      }
    }
  }

  // Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function isValidSet(card1, card2, card3) {
  const attributes = ['shape', 'color', 'number', 'shading'];

  for (let attr of attributes) {
    const v1 = card1[attr];
    const v2 = card2[attr];
    const v3 = card3[attr];

    // All same
    const allSame = v1 === v2 && v2 === v3;

    // All different
    const allDifferent = v1 !== v2 && v2 !== v3 && v1 !== v3;

    // If neither all same nor all different → invalid
    if (!allSame && !allDifferent) {
      return false;
    }
  }

  // All attributes passed the check
  return true;
}

function hasSetOnBoard(cards) {
  // Check all combinations of 3 cards
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        if (isValidSet(cards[i], cards[j], cards[k])) {
          return true; // Found at least one set
        }
      }
    }
  }
  return false; // No sets found
}
