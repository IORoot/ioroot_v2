const { execSync } = require('child_process');

console.log('Testing npm installation...');

try {
  // Test if npm is available
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log('npm version:', npmVersion.trim());
  
  // Try to install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installation successful!');
} catch (error) {
  console.error('Error:', error.message);
  console.log('Please make sure Node.js and npm are installed correctly.');
} 