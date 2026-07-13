require('dotenv').config();
const express = require('express');
const connectDB = async () => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const app = express();

// მონაცემთა ბაზის კავშირი
connectDB();

// Middleware შემავალი JSON-ისთვის
app.use(express.json());

// როუტების ინტეგრაცია
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));