import fs from 'node:fs';

const required = [
  'package.json',
  'firebase.json',
  '.firebaserc',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/appConfig.js',
  'src/services/cloudinary.js'
];

let ok = true;

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`MANQUANT: ${file}`);
    ok = false;
  }
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const dep of ['react', 'react-dom', 'vite', '@vitejs/plugin-react', 'firebase', 'lucide-react']) {
  if (!(pkg.dependencies?.[dep] || pkg.devDependencies?.[dep])) {
    console.error(`DEPENDANCE MANQUANTE: ${dep}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('OK — structure GitHub/Firebase prête.');
