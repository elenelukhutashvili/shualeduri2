const fs = require('fs');
if (!fs.existsSync('contacts.json')) fs.writeFileSync('contacts.json', '[]');
const contacts = JSON.parse(fs.readFileSync('contacts.json', 'utf-8'));
const [,, command, arg1, arg2] = process.argv;

if (command === 'add') {
    if (contacts.some(c => c.phone === arg1)) return console.log('existing');
    contacts.push({ phone: arg1, name: arg2 });
    fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
    console.log('added');
} else if (command === 'delete') {
    const filtered = contacts.filter(c => c.phone !== arg1);
    fs.writeFileSync('contacts.json', JSON.stringify(filtered, null, 2));
    console.log('delated');
} else if (command === 'show') {
    console.log(contacts);
}