const expenseService = require('../services/expenseService');
// ყველა ხარჯის წაკითხვა (API-სთვის)
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await expenseService.readData();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ახალი ხარჯის დამატება
exports.createExpense = async (req, res) => {
    try {
        const expenses = await expenseService.readData();
        const { title, amount, category } = req.body;

        if (!title || !amount) {
            return res.status(400).json({ error: "გთხოვთ შეავსოთ ყველა ველი" });
        }

        const newExpense = {
            id: Date.now().toString(), // უნიკალური ID
            title,
            amount: parseFloat(amount),
            category: category || "Other",
            date: new Date().toISOString().split('T')[0]
        };

        expenses.push(newExpense);
        await expenseService.writeData(expenses);

        // თუ ჩვეულებრივი ფორმიდან მოდის მოთხოვნა, დავაბრუნოთ მთავარ გვერდზე
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ხარჯის წაშლა
exports.deleteExpense = async (req, res) => {
    try {
        let expenses = await expenseService.readData();
        const { id } = req.params;

        expenses = expenses.filter(e => e.id !== id);
        await expenseService.writeData(expenses);

        res.json({ message: "წარმატებით წაიშალა" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};