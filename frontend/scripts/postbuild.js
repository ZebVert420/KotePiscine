// Script post-build compatible avec Windows et Unix/Linux
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le répertoire courant en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins des répertoires
const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

// Copier 404.html de public vers dist
try {
  const content404 = fs.readFileSync(path.join(publicDir, '404.html'), 'utf8');
  fs.writeFileSync(path.join(distDir, '404.html'), content404, 'utf8');
  console.log('✅ 404.html copié avec succès');
} catch (error) {
  console.error('❌ Erreur lors de la copie de 404.html:', error);
}

// Créer le fichier .nojekyll
try {
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');
  console.log('✅ .nojekyll créé avec succès');
} catch (error) {
  console.error('❌ Erreur lors de la création de .nojekyll:', error);
}

console.log('📦 Post-build terminé avec succès!'); 