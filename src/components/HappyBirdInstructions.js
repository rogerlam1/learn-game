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
        <li>First, look at the code in the right side panel. This is where your game will be built.</li>
        
        <li>
          <p>Copy and paste this prompt in the chat box (where you're talking to the AI):</p>
          
          <div className="code-prompt">
            <pre>
              {`Use React to create a simple Happy Bird game with keyboard controls. 
1. Use all of the same game elements of the original game
2. Game character must not be able to fall through the floor
3. Ensure physics is correct where bird cannot pass through objects
4. Game can start with space bar
5. Use bird.gif for character

Important: 
1. Create all game files in a new folder called 'game'
2. The game should be a standalone React application in the game folder with its own index.js and index.html
3. Include the Firebase scripts in the game's index.html
4. npm run game is already setup to run the game in the game directory
5. Keep game file structure simple with a main game file and a game mechanic file. 
6. Double check import of all mechanic variables `}
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