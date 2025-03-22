import React from 'react';

function TetrisInstructions({ onBack }) {
  return (
    <div className="game-instructions-detail">
      <h1>Building Your Tetris Game</h1>
      
      <p>Congratulations on choosing to build Tetris! This is a fun game where you control falling blocks and try to complete rows.</p>
      
      <h2>What You'll Need</h2>
      
      <p>You'll use Cursor to modify the code. Cursor is a special text editor that can help you write code with AI!</p>
      
      <h2>Let's Make the Game!</h2>
      
      <ol>
        <li>First, look at the code in the left side panel. This is where your game will be built.</li>
        
        <li>
          <p>Type this prompt in the chat box (where you're talking to the AI):</p>
          
          <div className="code-prompt">
            <pre>
              {`Create a simple Tetris game with keyboard controls. Use React to:
1. Make a grid for the Tetris pieces
2. Create different block shapes (using simple colored squares)
3. Make blocks fall automatically
4. Let me use arrow keys to move left, right, and down
5. Let me use the up arrow to rotate pieces
6. Add a score that increases when lines are completed
7. End the game when blocks reach the top

Important: 
1. Create all game files in a new folder called 'game'
2. The game should be a standalone React application in the game folder with its own index.js and index.html
3. Include the Firebase scripts in the game's index.html`}
            </pre>
          </div>
        </li>
        
        <li>
          <p>After you enter this prompt, the AI will help you make the game!</p>
        </li>
        
        <li>
          <p>Once the code is created, run your game with this command in the terminal:</p>
          
          <div className="code-prompt">
            <pre>npm run run:game</pre>
          </div>
          
          <p>This will automatically configure everything to run your game!</p>
        </li>
        
        <li>
          <p>When you want to return to this tutorial, run:</p>
          
          <div className="code-prompt">
            <pre>npm run run:tutorial</pre>
          </div>
        </li>
      </ol>
      
      <button onClick={onBack} className="back-button">Back to Selection</button>
    </div>
  );
}

export default TetrisInstructions; 