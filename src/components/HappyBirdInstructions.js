import React from 'react';
import CopyButton from './CopyButton';

function HappyBirdInstructions({ onBack }) {
  const happyBirdPrompt = `Use React to create Happy Bird game with keyboard controls. 
1. Use all of the same game elements of the original game ensure it's playble like the original
2. Create obstacles (pipes or columns with gaps to fly through).
3. Make the bird fall down due to gravity
4. Let me press the space bar to make the bird fly upward
5. Make obstacles move from right to left automatically but slowly at first.
6. Add a score that increases when passing through obstacles
7. End the game when the bird hits an obstacle or the ground
8. Game character must not be able to fall through the floor

Important: 
1. Create all game files the existing 'game' folder
2. The game should be a standalone React application in the game folder with its own index.js and index.html
3. Include the Firebase scripts in the game's index.html
4. npm run game is already setup to run the game in the game directory
5. Create the game with one main game file and one configuration file for game settings. 
6. Make sure bird.gif is in the right path within game folder and webpack.config.js supports it.`;

  const runGameCommand = `npm run game`;
  const runTutorialCommand = `npm run tutorial`;

  return (
    <div className="game-instructions-detail">
      <h1>Building Your Happy Bird Game</h1>
      
      <p>Congratulations on choosing to build Happy Bird! This is a fun game where you help a bird fly through obstacles.</p>
      
      <h2>What You'll Need</h2>
      
      <p>You'll use Cursor to modify the code. Cursor is a special text editor that can help you write code with AI!</p>
      
      <h2>Let's Make the Game!</h2>
      
      <ol>
        <li>First, look at the code in the right side panel. This is where your game will be built.</li>
        
        <li>
          <p>Copy and paste this prompt in the chat box (where you're talking to the AI):</p>
          
          <div className="code-prompt">
            <CopyButton textToCopy={happyBirdPrompt} />
            <pre>{happyBirdPrompt}</pre>
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

export default HappyBirdInstructions; 