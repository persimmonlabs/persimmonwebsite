const fs = require('fs');
const path = require('path');

// Color mappings - old to new
const colorMappings = {
  // Gray colors to neutral
  'text-gray-300': 'text-neutral-300',
  'text-gray-400': 'text-neutral-400',
  'text-gray-500': 'text-neutral-500',
  'text-gray-600': 'text-neutral-600',
  'text-gray-700': 'text-neutral-700',
  'text-gray-800': 'text-neutral-800',
  'bg-gray-300': 'bg-neutral-300',
  'bg-gray-400': 'bg-neutral-400',
  'bg-gray-500': 'bg-neutral-500',
  'bg-gray-600': 'bg-neutral-600',
  'bg-gray-700': 'bg-neutral-700',
  'bg-gray-800': 'bg-neutral-800',
  'bg-gray-900': 'bg-neutral-900',
  'border-gray-300': 'border-neutral-300',
  'border-gray-400': 'border-neutral-400',
  'border-gray-500': 'border-neutral-500',
  'border-gray-600': 'border-neutral-600',
  'border-gray-700': 'border-neutral-700',
  'border-gray-800': 'border-neutral-800',
  
  // Update backgrounds to use proper dark colors
  'from-persimmon-burgundy/20': 'from-persimmon-burgundy/30',
  'to-persimmon-brown/30': 'to-neutral-950/50',
  'from-persimmon-burgundy/30': 'from-persimmon-burgundy/40',
  'to-persimmon-brown/40': 'to-neutral-950/60',
  
  // Button hover states
  'hover:from-persimmon-burgundy/30': 'hover:from-persimmon-burgundy/40',
  'hover:to-persimmon-brown/40': 'hover:to-neutral-950/60',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  for (const [oldColor, newColor] of Object.entries(colorMappings)) {
    if (content.includes(oldColor)) {
      content = content.replace(new RegExp(oldColor, 'g'), newColor);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

// Update all component files
const componentsDir = path.join(__dirname, '..', 'components');
const appDir = path.join(__dirname, '..', 'app');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      updateFile(filePath);
    }
  });
}

console.log('Updating colors...');
walkDir(componentsDir);
walkDir(appDir);
console.log('Color update complete!');