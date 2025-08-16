import fs from 'fs';
import path from 'path';
// import pkg from './aliases.js';
// const { alias } = pkg;
// .storybook/main.ts

// import { alias } from './aliases.cjs';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { alias } = require('./aliases.cjs');

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
