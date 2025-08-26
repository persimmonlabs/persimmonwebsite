const fs = require('fs');
const path = require('path');

// Mapping of old classes to new design system
const replacements = {
  // Backgrounds
  'bg-black': 'bg-gray-950',
  'bg-neutral-950': 'bg-gray-900',
  'bg-neutral-900': 'bg-gray-850',
  'from-black': 'from-gray-950',
  'to-black': 'to-gray-950',
  'via-black': 'via-gray-950',
  
  // Text colors
  'text-neutral-300': 'text-gray-300',
  'text-neutral-400': 'text-gray-400',
  'text-neutral-500': 'text-gray-500',
  'text-neutral-600': 'text-gray-600',
  
  // Borders
  'border-neutral-800': 'border-gray-800',
  'border-neutral-700': 'border-gray-700',
  'border-neutral-600': 'border-gray-600',
  
  // Old color system to new
  'from-persimmon-coral': 'from-brand-primary',
  'to-persimmon-orange': 'to-brand-secondary',
  'via-persimmon-orange': 'via-brand-secondary',
  'text-persimmon-coral': 'text-brand-primary',
  'text-persimmon-orange': 'text-brand-secondary',
  'text-persimmon-peach': 'text-brand-accent',
  'bg-persimmon-coral': 'bg-brand-primary',
  'bg-persimmon-orange': 'bg-brand-secondary',
  'border-persimmon-coral': 'border-brand-primary',
  'border-persimmon-red': 'border-brand-wine',
  'from-persimmon-burgundy': 'from-brand-dark',
  'to-persimmon-burgundy': 'to-brand-dark',
  'bg-persimmon-burgundy': 'bg-brand-dark',
  
  // Spacing - standardize all sections
  'py-20 md:py-28 lg:py-32': 'section-spacing',
  'py-16 sm:py-24 lg:py-32': 'section-spacing',
  'px-4 sm:px-6 lg:px-8': 'section-padding',
  
  // Max widths
  'max-w-7xl mx-auto': 'container-max',
  'max-w-4xl mx-auto': 'content-max',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // Use word boundaries for more accurate replacement
    const regex = new RegExp(`\\b${oldClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, newClass);
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated: ${path.basename(filePath)}`);
    return true;
  }
  return false;
}

// Update all component files
const componentsDir = path.join(__dirname, '..', 'components');
const appDir = path.join(__dirname, '..', 'app');

let totalUpdated = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (updateFile(filePath)) {
        totalUpdated++;
      }
    }
  });
}

console.log('🎨 Applying new design system...\n');
walkDir(componentsDir);
walkDir(appDir);
console.log(`\n✅ Design system update complete! Updated ${totalUpdated} files.`);