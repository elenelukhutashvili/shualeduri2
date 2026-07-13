const fs = require('fs');
const text = fs.readFileSync('random.txt', 'utf-8');
const charsCount = text.replace(/\s/g, '').length;
const wordsCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
const vowelsCount = (text.match(/[aeiouyAEIOUY]/g) || []).length;

const result = { word: wordsCount, vowel: vowelsCount, chars: charsCount };
fs.writeFileSync('result.json', JSON.stringify(result, null, 2));
console.log('stoped');