const fs = require('fs').promises;
const path = require('path');

// ფაილის გზა მთავარ დირექტორიაში
const filePath = path.join(__dirname, '../expenses.json');

const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // თუ ფაილი არ არსებობს, დავაბრუნოთ ცარიელი მასივი
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {
    readData,
    writeData
};