import { marked } from 'marked';

// Test 1: # in code block
const test1 = [
  '```',
  '#引入=other.nr',
  '```'
].join('\n');

// Test 2: Multiple # in code block
const test2 = [
  '```',
  '#引入=other.nr',
  'myPkg:#引入=other.nr',
  '#引入*=other.nr',
  '```'
].join('\n');

// Test 3: # at start of line without code block
const test3 = '#引入=other.nr';

// Test 4: Simulate preprocessLinks 
const test4 = [
  '[词法结构](./lexical)',
  '',
  '```',
  '#引入=other.nr',
  'myPkg:#引入=other.nr',
  '```'
].join('\n');

console.log('=== Test 1: # in code block ===');
console.log(marked.parse(test1, { gfm: true }));

console.log('=== Test 2: Multiple # in code block ===');
console.log(marked.parse(test2, { gfm: true }));

console.log('=== Test 3: # at start of line (no code block) ===');
console.log(marked.parse(test3, { gfm: true }));

console.log('=== Test 4: With preprocessLinks simulation ===');
const processed = test4.replace(/\]\(\.\/([^)]*?)\)/g, (_, path) => {
  return `](#/v0.1.0/${path})`;
});
console.log(marked.parse(processed, { gfm: true }));
