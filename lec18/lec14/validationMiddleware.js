const mongoose = require('mongoose');

// 3. 
const validateDeleteSecret = (req, res, next) => {
    const secretKey = req.headers['secret'];
    if (secretKey !== 'random123') {
        return res.status(403).json({ error: "წვდომა უარყოფილია! არასწორი ან დაკარგული საიდუმლო ჰედერი (secret)." });
    }
    next();
};

// 4. 
const validateCreateExpense = (req, res, next) => {
    const { title, amount, category } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: "არასწორი ან ცარიელი title!" });
    }
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "amount აუცილებელია და უნდა იყოს 0-ზე მეტი რიცხვი!" });
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({ error: "კატეგორიის (category) მითითება აუცილებელია!" });
    }
    next();
};

// 5.
const randomBlocker = (req, res, next) => {
    const shouldBlock = Math.random() < 0.5;
    if (shouldBlock) {
        return res.status(500).json({ error: "სერვერის შემთხვევითი შეცდომა (მოთხოვნა დაიბლოკა მიდლვეარის მიერ)!" });
    }
    next();
};

const validateMongoId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "არასწორი MongoDB ID-ის ფორმატი!" });
    }
    next();
};

module.exports = {
    validateDeleteSecret,
    validateCreateExpense,
    randomBlocker,
    validateMongoId
};