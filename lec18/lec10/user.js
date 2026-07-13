const fs = require('fs');
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const filteredUsers = data.map(user => ({ id: user.id, name: user.name, username: user.username, email: user.email }));
        fs.writeFileSync('users.json', JSON.stringify(filteredUsers, null, 2), 'utf-8');
        console.log('✅ users.json შეიქმნა!');
    });