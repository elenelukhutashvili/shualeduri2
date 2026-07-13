require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB კავშირი
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB წარმატებით დაუკავშირდა'))
    .catch(err => console.error('ბაზასთან დაკავშირების შეცდომა:', err.message));

// როუტების ჩართვა
app.use('/', expenseRoutes);

// გლობალური 404 შეცდომა
app.use((req, res) => {
    res.status(404).json({ error: "მოთხოვნილი გვერდი ვერ მოიძებნა" });
});

app.listen(PORT, () => {
    console.log(`სერვერი წარმატებით მუშაობს პორტზე: ${PORT}`);
});