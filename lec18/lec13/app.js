const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const FILE_NAME = 'expenses.json';
app.use(express.json());

const readExpenses = () => {
    try {
        return JSON.parse(fs.readFileSync(FILE_NAME, 'utf-8'));
    } catch (e) {
        return [];
    }
};

const saveExpenses = (data) => {
    fs.writeFileSync(FILE_NAME, JSON.stringify(data, null, 2), 'utf-8');
};
// 1.
app.get('/expenses', (req, res) => {
    const expenses = readExpenses();
    let page = parseInt(req.query.page) || 1;
    let take = parseInt(req.query.take) || 10;
    if (page < 1 || take < 1) {
        return res.status(400).json({ error: "page და take უნდა იყოს 1-ზე მეტი!" });
    }
    const MAX_TAKE = 50;
    if (take > MAX_TAKE) {
        take = MAX_TAKE;
    }
    const startIndex = (page - 1) * take;
    const endIndex = startIndex + take;
    const paginatedExpenses = expenses.slice(startIndex, endIndex);
    res.json({
        page,
        take,
        totalItems: expenses.length,
        totalPages: Math.ceil(expenses.length / take),
        data: paginatedExpenses
    });
});
// 2.
app.post('/expenses', (req, res) => {
    const { title, amount } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: "არასწორი ან ცარიელი title!" });
    }
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "amount უნდა იყოს 0-ზე მეტი" });
    }
    const expenses = readExpenses()
    const newExpense = {
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        title: title.trim(),
        amount: amount,
        createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    saveExpenses(expenses);

    res.status(201).json({ message: "არჯი წარმატებით დაემატა!", data: newExpense });
});

// 3.
app.put('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, amount } = req.body;
    const expenses = readExpenses();
    const expense = expenses.find(e => e.id === id);
    if (!expense) {
        return res.status(404).json({ error: "ამ ID-ით ხარჯი ვერ მოიძებნა!" });
    }
    if (title && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: "არასწორი title ფორმატი!" });
    }
    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return res.status(400).json({ error: "amount უნდა იყოს 0-ზე მეტი!" });
    }

    if (title) expense.title = title.trim();
    if (amount) expense.amount = amount;

    saveExpenses(expenses);
    res.json({ message: "ხარჯი განახლდა", data: expense });
});
// 4.
app.delete('/expenses/:id', (req, res) => {
    const secretKey = req.headers['secret'];
    if (secretKey !== 'random123') {
        return res.status(403).json({ error: " წვდომა უარყოფილია! არასწორი ან დაკარგული საიდუმლო ჰედერი (secret)." });
    }
    const id = parseInt(req.params.id);
    const expenses = readExpenses();
    const initialLength = expenses.length;
    const filteredExpenses = expenses.filter(e => e.id !== id);
    if (filteredExpenses.length === initialLength) {
        return res.status(404).json({ error: "ამ ID-ით ხარჯი ვერ მოიძებნა!" });
    }
    saveExpenses(filteredExpenses);
    res.json({ message: `ხარჯი ID-ით ${id} წარმატებით წაიშალა.` });
});

app.use((req, res) => {
    res.status(404).json({ error: "მოთხოვნილი ლინკი ვერ მოიძებნა!" });
});

app.listen(PORT, () => {
    console.log(` სერვერი წარმატებით ჩაირთო: http://localhost:${PORT}`);
});