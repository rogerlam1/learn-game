const fs = require('fs');
const path = require('path');

console.log('Setting up tutorial environment...');

// Setup firebase.json
const firebaseConfigPath = path.join(__dirname, '..', 'firebase.json');
let firebaseConfig;

try {
  const firebaseConfigContent = fs.readFileSync(firebaseConfigPath, 'utf8');
  firebaseConfig = JSON.parse(firebaseConfigContent);
  
  // Update the public folder to 'dist'
  firebaseConfig.hosting.public = 'dist';
  
  fs.writeFileSync(
    firebaseConfigPath,
    JSON.stringify(firebaseConfig, null, 2),
    'utf8'
  );
  console.log('Updated firebase.json to use the dist folder');
} catch (error) {
  console.error('Error updating firebase.json:', error);
  process.exit(1);
}

// Update webpack.config.js to use the src entry point
const webpackConfigPath = path.join(__dirname, '..', 'webpack.config.js');
try {
  let webpackContent = fs.readFileSync(webpackConfigPath, 'utf8');
  
  // Replace the entry point
  webpackContent = webpackContent.replace(
    /entry:\s*['"]\.\/game\/index\.js['"]/,
    "entry: './src/index.js'"
  );
  
  // Replace the output path
  webpackContent = webpackContent.replace(
    /path:\s*path\.resolve\(__dirname,\s*['"]game['"]\)/,
    "path: path.resolve(__dirname, 'dist')"
  );
  
  // Update the HTML template
  webpackContent = webpackContent.replace(
    /template:\s*['"]\.\/game\/index\.html['"]/,
    "template: './public/index.html'"
  );
  
  fs.writeFileSync(webpackConfigPath, webpackContent, 'utf8');
  console.log('Updated webpack.config.js to use the src folder');
} catch (error) {
  console.error('Error updating webpack.config.js:', error);
  process.exit(1);
}

console.log('Tutorial environment setup complete! Run "npm start" to start the development server.'); 