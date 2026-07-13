module.exports = (req, res, next) => {
    const { title, amount } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: "არასწორი ან ცარიელი title!" });
    }
    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "amount უნდა იყოს 0-ზე მეტი რიცხვი!" });
    }
    next();
}