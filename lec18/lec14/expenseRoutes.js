/*const express = require('express');
const router = express.Router();
const expenseService = require('./expenseService');
const { validateDeleteSecret, validateCreateExpense, randomBlocker } = require('./validationMiddleware');

router.get('/expenses', (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let take = parseInt(req.query.take) || 10;

    if (page < 1 || take < 1) {
        return res.status(400).json({ error: "page და take უნდა იყოს 1-ზე მეტი!" });
    }
    const result = expenseService.getAllExpenses(page, take);
    res.json(result);
});

router.post('/expenses', validateCreateExpense, (req, res) => {
    const { title, amount } = req.body;
    const newExpense = expenseService.createExpense(title, amount);
    res.status(201).json({ message: "ხარჯი წარმატებით დაემატა!", data: newExpense });
});

router.put('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, amount } = req.body;

    if (title && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ error: "არასწორი title ფორმატი!" });
    }
    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return res.status(400).json({ error: "amount უნდა იყოს 0-ზე მეტი!" });
    }

    const updated = expenseService.updateExpense(id, title, amount);
    if (!updated) {
        return res.status(404).json({ error: "ამ ID-ით ხარჯი ვერ მოიძებნა!" });
    }

    res.json({ message: "ხარჯი განახლდა", data: updated });
});

router.delete('/expenses/:id', validateDeleteSecret, (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = expenseService.deleteExpense(id);

    if (!isDeleted) {
        return res.status(404).json({ error: "ამ ID-ით ხარჯი ვერ მოიძებნა!" });
    }

    res.json({ message: `ხარჯი ID-ით ${id} წარმატებით წაიშალა.` });
});

// 5. 
router.get('/random-fact', randomBlocker, (req, res) => {
    const facts = [
        "პირველი კომპიუტერული ვირუსი 1971 წელს შეიქმნა და მას Creeper ერქვა.",
        "JavaScript სულ რაღაც 10 დღეში შეიქმნა ბრენდან აიხის მიერ.",
        "კომპიუტერულ მეცნიერებაში პირველი ბაგი ნამდვილი მწერი (ჩრჩილი) იყო, რომელიც რელეში გაიჭედა.",
        "Node.js თავდაპირველად რაიან დალის მიერ შეიქმნა 2009 წელს."
    ];
    const randomIdx = Math.floor(Math.random() * facts.length);
    res.json({ fact: facts[randomIdx] });
});
module.exports = router*/
const express = require('express');
const router = express.Router();
const expenseService = require('./expenseService');
const { validateMongoId, validateCreateExpense, validateDeleteSecret, randomBlocker } = require('./validationMiddleware');

// 1. GET /expenses/top-5 (ყველაზე ძვირი 5 ხარჯი)
router.get('/expenses/top-5', async (req, res) => {
    try {
        const topExpenses = await expenseService.getTop5Expenses();
        res.json(topExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET /expenses (ფილტრებით)
router.get('/expenses', async (req, res) => {
    try {
        const expenses = await expenseService.getExpenses(req.query);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. POST /expenses (ახალი ხარჯის შექმნა ვალიდაციით)
router.post('/expenses', validateCreateExpense, async (req, res) => {
    try {
        const { title, amount, category } = req.body;
        const newExpense = await expenseService.createExpense({ title, amount, category });
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. PUT /expenses/:id (განახლება ID-ის ვალიდაციით)
router.put('/expenses/:id', validateMongoId, async (req, res) => {
    try {
        const updated = await expenseService.updateExpense(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. DELETE /expenses/:id (წაშლა უსაფრთხოების მიდლვეარით და ID ვალიდაციით)
router.delete('/expenses/:id', validateMongoId, validateDeleteSecret, async (req, res) => {
    try {
        const deleted = await expenseService.deleteExpense(req.params.id);
        if (!deleted) return res.status(404).json({ error: "ხარჯი ამ ID-ით ვერ მოიძებნა" });
        res.json({ message: "ხარჯი წარმატებით წაიშალა ბაზიდან" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. GET /random-fact (50%-იანი ბლოკერით)
router.get('/random-fact', randomBlocker, (req, res) => {
    const facts = [
        "პირველი კომპიუტერული ვირუსი 1971 წელს შეიქმნა და მას Creeper ერქვა.",
        "JavaScript სულ რაღაც 10 დღეში შეიქმნა ბრენდან აიხის მიერ.",
        "კომპიუტერულ მეცნიერებაში პირველი ბაგი ნამდვილი ჩრჩილი იყო.",
        "Node.js თავდაპირველად რაიან დალის მიერ შეიქმნა 2009 წელს."
    ];
    const randomIdx = Math.floor(Math.random() * facts.length);
    res.json({ fact: facts[randomIdx] });
});

module.exports = router;