const fs = require('fs');
const path = require('path');

let totalWords = 0;
let totalVowels = 0;

function analyzeTxtFiles(dirPath) {
    // ვკითხულობთ ფოლდერის შიგთავსს (ფაილებს და სხვა ფოლდერებს)
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // თუ ფოლდერია, რეკურსიულად ისევ შევდივართ შიგნით
            analyzeTxtFiles(fullPath);
        } else if (stat.isFile() && path.extname(fullPath) === '.txt') {
            // თუ .txt გაფართოების ფაილია, ვკითხულობთ მის კონტენტს
            const content = fs.readFileSync(fullPath, 'utf-8');

            // სიტყვების დათვლა
            const wordsArray = content.trim().split(/\s+/);
            const wordsCount = content.trim() === "" ? 0 : wordsArray.length;

            // ხმოვნების დათვლა (ქართული და ინგლისური ხმოვნები)
            const vowelsMatch = content.match(/[aeiouyAEIOUYაეიოუ]/g);
            const vowelsCount = vowelsMatch ? vowelsMatch.length : 0;

            totalWords += wordsCount;
            totalVowels += vowelsCount;
        }
    });
}