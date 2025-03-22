import React from 'react';

function HappyBirdInstructions({ onBack }) {
  return (
    <div className="game-instructions-detail">
      <h1>Building Your Happy Bird Game</h1>
      
      <p>Congratulations on choosing to build Happy Bird! This is a fun game where you help a bird fly through obstacles.</p>
      
      <h2>What You'll Need</h2>
      
      <p>You'll use Cursor to modify the code. Cursor is a special text editor that can help you write code with AI!</p>
      
      <h2>Let's Make the Game!</h2>
      
      <ol>
        <li>First, look at the code in the left side panel. This is where your game will be built.</li>
        
        <li>
          <p>Type this prompt in the chat box (where you're talking to the AI):</p>
          
          <div className="code-prompt">
            <pre>
              {`Create a simple Happy Bird game with keyboard controls. Use React to:
1. Make a bird character (a simple colored square or circle)
2. Create obstacles (pipes or columns with gaps to fly through)
3. Make the bird fall down due to gravity
4. Let me press the space bar to make the bird fly upward
5. Make obstacles move from right to left automatically
6. Add a score that increases when passing through obstacles
7. End the game when the bird hits an obstacle or the ground
8. Game character must not be able to fall through the floor

Important: 
1. Create all game files in a new folder called 'game'
2. The game should be a standalone React application in the game folder with its own index.js and index.html
3. Include the Firebase scripts in the game's index.html
4. npm run game is already setup to run the game in the game directory`}
            </pre>
          </div>
        </li>
        
        <li>
          <p>After you enter this prompt, the AI will help you make the game!</p>
        </li>
        
        <li>
          <p>Once the code is created, run your game with this command in the terminal:</p>
          
          <div className="code-prompt">
            <pre>npm run game</pre>
          </div>
          
          <p>This will automatically configure everything to run your game!</p>
        </li>
        
        <li>
          <p>When you want to return to this tutorial, run:</p>
          
          <div className="code-prompt">
            <pre>npm run tutorial</pre>
          </div>
        </li>
      </ol>
      
      <button onClick={onBack} className="back-button">Back to Selection</button>
    </div>
  );
}

export default HappyBirdInstructions; 