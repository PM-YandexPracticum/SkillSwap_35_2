import fs from 'fs';
import path from 'path';
import { alias } from './aliases.ts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigs = ['./tsconfig.app.json', './tsconfig.node.json'];

const paths: Record<string, string[]> = {};
for (const key in alias) {
  const relativePath = path
    .relative(process.cwd(), alias[key])
    .replace(/\\/g, '/');
  paths[`${key}/*`] = [`${relativePath}/*`];
}

tsconfigs.forEach((tsconfigPath) => {
  const fullPath = path.resolve(__dirname, tsconfigPath);
  if (!fs.existsSync(fullPath)) return;

  const tsconfig = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.baseUrl = '.';
  tsconfig.compilerOptions.paths = paths;

  fs.writeFileSync(fullPath, JSON.stringify(tsconfig, null, 2));
  console.log(`✅ Алиасы синхронизированы в ${tsconfigPath}`);
});
