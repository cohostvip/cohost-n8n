#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load .env.local if it exists, otherwise .env
const envLocalPath = path.resolve(__dirname, '../.env.local');
const envPath = path.resolve(__dirname, '../.env');

const envFile = fs.existsSync(envLocalPath) ? envLocalPath : fs.existsSync(envPath) ? envPath : null;

const vars = {
  COHOST_API_URL: 'https://api.cohost.vip',
};

if (envFile) {
  const lines = fs.readFileSync(envFile, 'utf8').split('\n');
  for (const line of lines) {
    const match = line.match(/^(\w+)=(.*)$/);
    if (match && match[1] in vars) {
      vars[match[1]] = match[2].trim();
    }
  }
}

const output = `// AUTO-GENERATED — do not edit. Run "npm run build" to regenerate.
export const BASE_URL = '${vars.COHOST_API_URL}';
export const API_BASE = '${vars.COHOST_API_URL}/v1';
`;

fs.writeFileSync(path.resolve(__dirname, '../nodes/Cohost/consts.ts'), output);
console.log('Generated consts.ts from env:', envFile || 'defaults');
