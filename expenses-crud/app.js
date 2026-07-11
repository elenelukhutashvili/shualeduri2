const express = require('express');
const path = require('path');
const app = express();

// EJS კონფიგურაცია
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// როუტერების შემოტანა
const pageRoutes = require('./routes/views/pages');
const apiRoutes = require('./routes/api/expenses');

// როუტერების გამოყენება
app.use('/', pageRoutes);
app.use('/api/expenses', apiRoutes);

// სერვერის პორტი
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});