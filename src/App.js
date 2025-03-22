import React, { useState } from 'react';
import './App.css';
import TetrisInstructions from './components/TetrisInstructions';
import HappyBirdInstructions from './components/HappyBirdInstructions';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBackToSelection = () => {
    setSelectedGame(null);
  };

  const renderGameSelection = () => {
    return (
      <div className="game-selection">
        <h1>Choose Your Game!</h1>
        <div className="game-buttons">
          <button onClick={() => handleGameSelect('tetris')}>
            Tetris
          </button>
          <button onClick={() => handleGameSelect('happybird')}>
            Happy Bird
          </button>
        </div>
      </div>
    );
  };

  const renderGameInstructions = () => {
    if (selectedGame === 'tetris') {
      return (
        <div className="game-instructions">
          <TetrisInstructions onBack={handleBackToSelection} />
        </div>
      );
    } else if (selectedGame === 'happybird') {
      return (
        <div className="game-instructions">
          <HappyBirdInstructions onBack={handleBackToSelection} />
        </div>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn Game</h1>
        <p>Welcome to your coding adventure!</p>
      </header>
      <main>
        {selectedGame ? renderGameInstructions() : renderGameSelection()}
      </main>
    </div>
  );
}

export default App; 