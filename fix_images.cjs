const fs = require('fs');
const path = require('path');

const publicDir = path.join('client', 'public');

const sports = ['Basketball', 'Tennis', 'Ice Hockey', 'Football', 'Baseball'];

sports.forEach((sport, i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#1B3A6B"/>
    <text x="400" y="400" font-family="sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${sport} Image Placeholder</text>
    <text x="400" y="450" font-family="sans-serif" font-size="24" fill="#a0aec0" text-anchor="middle" dominant-baseline="middle">(Replace with real photo)</text>
  </svg>`;
  fs.writeFileSync(path.join(publicDir, `hero-${i+1}.svg`), svg);
});

let content = fs.readFileSync('client/src/pages/Directory.tsx', 'utf8');

const oldImagesRegex = /const HERO_IMAGES = \[[^\]]+\];/s;
const newImages = `const HERO_IMAGES = [
  "/hero-1.svg", 
  "/hero-2.svg", 
  "/hero-3.svg", 
  "/hero-4.svg", 
  "/hero-5.svg", 
];`;

content = content.replace(oldImagesRegex, newImages);
fs.writeFileSync('client/src/pages/Directory.tsx', content);

console.log('Created local placeholders and updated Directory.tsx');
