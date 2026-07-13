import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'v0.1.0');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let inCodeBlock = false;

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = content.split('\n');
  inCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track code block state
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    
    // Skip if in code block
    if (inCodeBlock) continue;
    
    // Skip heading lines (##, ###, etc.)
    if (/^#{1,6}\s/.test(line)) continue;
    
    // Check if line starts with # (which would be a heading)
    if (line.startsWith('#')) {
      console.log(`[HEADING ISSUE] ${f}:${i + 1}: ${line}`);
    }
  }
}

console.log('Check complete.');
