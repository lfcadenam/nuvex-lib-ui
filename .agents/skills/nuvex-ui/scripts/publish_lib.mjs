/**
 * Helper de Publicación Automatizada para Nuvex UI
 * Uso: node publish_lib.mjs [--patch | --minor | --version=0.1.0]
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar raíz de nuvex-lib-ui buscando hacia arriba
let currentDir = __dirname;
let rootLibDir = null;
while (currentDir && currentDir !== path.dirname(currentDir)) {
  if (fs.existsSync(path.join(currentDir, 'projects/nuvex-ui/package.json'))) {
    rootLibDir = currentDir;
    break;
  }
  if (fs.existsSync(path.join(currentDir, 'nuvex-lib-ui/projects/nuvex-ui/package.json'))) {
    rootLibDir = path.join(currentDir, 'nuvex-lib-ui');
    break;
  }
  currentDir = path.dirname(currentDir);
}

if (!rootLibDir) {
  console.error(`[ERROR] No se pudo localizar la carpeta raíz de nuvex-lib-ui`);
  process.exit(1);
}
const pkgPath = path.join(rootLibDir, 'projects/nuvex-ui/package.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;
console.log(`\n======================================================`);
console.log(`  🚀 NUVEX UI — ASISTENTE DE PUBLICACIÓN`);
console.log(`======================================================`);
console.log(`Versión actual: ${currentVersion}\n`);

// Determinar nueva versión
let newVersion = currentVersion;
const args = process.argv.slice(2);

if (args.includes('--minor')) {
  const [major, minor] = currentVersion.split('.').map(Number);
  newVersion = `${major}.${minor + 1}.0`;
} else if (args.includes('--patch')) {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  newVersion = `${major}.${minor}.${patch + 1}`;
} else {
  const customVer = args.find(a => a.startsWith('--version='));
  if (customVer) {
    newVersion = customVer.split('=')[1];
  } else {
    // Por defecto patch
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    newVersion = `${major}.${minor}.${patch + 1}`;
  }
}

console.log(`Nueva versión a publicar: ${newVersion}`);
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`[OK] projects/nuvex-ui/package.json actualizado a v${newVersion}`);

// Compilación y validación
console.log(`\nCompilando y validando librería (npm run build:all)...`);
try {
  execSync('npm run build:all', { cwd: rootLibDir, stdio: 'inherit' });
  console.log(`[OK] Compilación completada con éxito.`);
} catch (err) {
  console.error(`[ERROR] Falló la compilación. Abortando publicación.`);
  process.exit(1);
}

// Publicación en registro
console.log(`\nPublicando en registro privado Nuvex (npm run publish:lib)...`);
try {
  execSync('npm run publish:lib', { cwd: rootLibDir, stdio: 'inherit' });
  console.log(`\n🎉 ¡nuvex-ui v${newVersion} publicada exitosamente en https://npm.nuvex-tecnologia.com/!\n`);
} catch (err) {
  console.error(`\n[ERROR] Falló la publicación en el registro npm.`);
  console.error(`Verifica si tienes sesión activa con: npm login --registry https://npm.nuvex-tecnologia.com/\n`);
}
