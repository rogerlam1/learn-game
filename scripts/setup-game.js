const fs = require('fs');
const path = require('path');

console.log('Setting up game environment...');

// Setup firebase.json
const firebaseConfigPath = path.join(__dirname, '..', 'firebase.json');
let firebaseConfig;

try {
  const firebaseConfigContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  firebaseConfig = JSON.parse(firebaseConfigContent);
  
  // Update the public folder to 'game'
  firebaseConfig.hosting.public = 'game';
  
  fs.writeFileSync(
    firebaseConfigPath,
    JSON.stringify(firebaseConfig, null, 2),
    'utf8'
  );
  console.log('Updated firebase.json to use the game folder');
} catch (error) {
  console.error('Error updating firebase.json:', error);
  process.exit(1);
}

// Update webpack.config.js to use the game entry point
const webpackConfigPath = path.join(__dirname, '..', 'webpack.config.js');
try {
  let webpackContent = fs.readFileSync(webpackConfigPath, 'utf8');
  
  // Replace the entry point
  webpackContent = webpackContent.replace(
    /entry:\s*['"]\.\/src\/index\.js['"]/,
    "entry: './game/index.js'"
  );
  
  // Replace the output path
  webpackContent = webpackContent.replace(
    /path:\s*path\.resolve\(__dirname,\s*['"]dist['"]\)/,
    "path: path.resolve(__dirname, 'game')"
  );
  
  // Update the HTML template if it exists in the game folder
  if (fs.existsSync(path.join(__dirname, '..', 'game', 'index.html'))) {
    webpackContent = webpackContent.replace(
      /template:\s*['"]\.\/public\/index\.html['"]/,
      "template: './game/index.html'"
    );
  }
  
  fs.writeFileSync(webpackConfigPath, webpackContent, 'utf8');
  console.log('Updated webpack.config.js to use the game folder');
} catch (error) {
  console.error('Error updating webpack.config.js:', error);
  process.exit(1);
}

// Check if game directory exists, create it if it doesn't
const gameDir = path.join(__dirname, '..', 'game');
if (!fs.existsSync(gameDir)) {
  fs.mkdirSync(gameDir, { recursive: true });
  console.log('Created game directory');
  
  // Create a basic index.js and index.html if they don't exist
  const indexJsPath = path.join(gameDir, 'index.js');
  if (!fs.existsSync(indexJsPath)) {
    const basicIndexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';

const GameApp = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Game</h1>
      <p>This is where your game will be built!</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameApp />
  </React.StrictMode>
);`;
    
    fs.writeFileSync(indexJsPath, basicIndexJs, 'utf8');
    console.log('Created basic index.js in game folder');
  }
  
  const indexHtmlPath = path.join(gameDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    const basicIndexHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Game - React + Firebase</title>

    <!-- Firebase SDKs -->
    <script defer src="/__/firebase/11.5.0/firebase-app-compat.js"></script>
    <script defer src="/__/firebase/11.5.0/firebase-auth-compat.js"></script>
    <script defer src="/__/firebase/11.5.0/firebase-firestore-compat.js"></script>
    <script defer src="/__/firebase/init.js?useEmulator=true"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
    
    fs.writeFileSync(indexHtmlPath, basicIndexHtml, 'utf8');
    console.log('Created basic index.html in game folder');
  }
}

console.log('Game environment setup complete! Run "npm start" to start the development server.'); 