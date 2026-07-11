const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'gita-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

module.exports = app;