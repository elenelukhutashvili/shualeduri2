const expenseService = require('../services/expenseService');
exports.renderHome = async (req, res) => {
    try {
        const expenses = await expenseService.readData();
        res.render('index', { expenses });
    } catch (error) {
        res.status(500).send("სერვერის შეცდომა");
    }
};

exports.renderCreateForm = (req, res) => {
    res.render('create');
};