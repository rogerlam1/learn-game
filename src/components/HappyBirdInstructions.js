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

Important: 
1. Create all game files in a folder called 'game'
2. Update the firebase.json file to change the "hosting" > "public" value from "dist" to "game"
3. Make sure the index.html in the game folder includes all necessary Firebase scripts`}
            </pre>
          </div>
        </li>
        
        <li>
          <p>After you enter this prompt, the AI will help you make the game!</p>
        </li>
        
        <li>
          <p>Once the code is created, go to the next step: open the file <code>Tutorial/Step3-TestHappyBird.md</code></p>
        </li>
      </ol>
      
      <button onClick={onBack} className="back-button">Back to Selection</button>
    </div>
  );
}

export default HappyBirdInstructions; 