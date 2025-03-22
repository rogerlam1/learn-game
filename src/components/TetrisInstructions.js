import React from 'react';
import CopyButton from './CopyButton';

function TetrisInstructions({ onBack }) {
  const tetrisPrompt = `Create a simple Tetris game with keyboard controls using html:
1. Make the game with all of the original Tetris elements and mechanics
2. Game blocks must not be able to fall through the floor

Important: 
1. Create all game files in a new folder called 'game'. 
2. Create a html component-based implementation with a proper index.js entry point
3. The main index.js file should render your React Tetris component
4. Include these Firebase scripts in the game's index.html.
5. Create the entire game in one file.`;

  const runGameCommand = `npm run game`;
  const runTutorialCommand = `npm run tutorial`;

  return (
    <div className="game-instructions-detail">
      <h1>Building Your Tetris Game</h1>
      
      <p>Congratulations on choosing to build Tetris! This is a fun game where you control falling blocks and try to complete rows.</p>
      
      <h2>What You'll Need</h2>
      
      <p>You'll use Cursor to modify the code. Cursor is a special text editor that can help you write code with AI!</p>
      
      <h2>Let's Make the Game!</h2>
      
      <ol>
        <li>First, look at the code in the right side panel. This is where your game will be built.</li>
        
        <li>
          <p>Copy and paste this prompt in the chat box (where you're talking to the AI):</p>
          
          <div className="code-prompt">
            <CopyButton textToCopy={tetrisPrompt} />
            <pre>{tetrisPrompt}</pre>
          </div>
        </li>
        
        <li>
          <p>After you enter this prompt, the AI will help you make the game!</p>
        </li>
        
        <li>
          <p>Once the code is created, stop the terminal with CTL+C, then run your game with this command in the terminal:</p>
          
          <div className="code-prompt">
            <CopyButton textToCopy={runGameCommand} />
            <pre>{runGameCommand}</pre>
          </div>
          
          <p>This will automatically configure everything to run your game!</p>
        </li>
        
        <li>
          <p>When you want to return to this tutorial, run:</p>
          
          <div className="code-prompt">
            <CopyButton textToCopy={runTutorialCommand} />
            <pre>{runTutorialCommand}</pre>
          </div>
        </li>
      </ol>
      
      <button onClick={onBack} className="back-button">Back to Selection</button>
    </div>
  );
}

export default TetrisInstructions; 