const fs = require('fs');
if (!fs.existsSync('cars.json')) fs.writeFileSync('cars.json', '[]');
const cars = JSON.parse(fs.readFileSync('cars.json', 'utf-8'));
const [,, param1, param2, param3] = process.argv;

if (param1 === 'show') {
    const filtered = cars.filter(c => c.carColor.toLowerCase() === param2.toLowerCase() || c.carReleaseDate === param2);
    console.log(filtered);
} else {
    cars.push({ carName: param1, carReleaseDate: param2, carColor: param3 });
    fs.writeFileSync('cars.json', JSON.stringify(cars, null, 2));
    console.log('added');
}