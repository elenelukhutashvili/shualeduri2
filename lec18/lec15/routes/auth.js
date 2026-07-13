const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

// რეგისტრაცია
router.post('/register', async (req, res) => {
  try {
    // Zod ვალიდაცია
    registerSchema.parse({ body: req.body });

    const { fullName, email, password, birthDate } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს' });

    user = new User({ fullName, email, password, birthDate });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ message: 'მომხმარებელი წარმატებით დარეგისტრირდა' });
  } catch (err) {
    if (err.errors) return res.status(400).json({ errors: err.errors });
    res.status(500).send('Server Error');
  }
});

// ავტორიზაცია (Login)
router.post('/login', async (req, res) => {
  try {
    loginSchema.parse({ body: req.body });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'არასწორი მონაცემები' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'არასწორი მონაცემები' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    if (err.errors) return res.status(400).json({ errors: err.errors });
    res.status(500).send('Server Error');
  }
});

// მომხმარებლის წაშლა (ტესტირებისთვის, კასკადურობის შესამოწმებლად)
router.delete('/delete-profile', async (req, res) => {
  // აქ ჩავსვათ უბრალოდ ID ტესტისთვის body-დან ან middleware-დან
  const { userId } = req.body;
  await User.findOneAndDelete({ _id: userId });
  res.json({ message: 'მომხმარებელი და მისი ბლოგები წაიშალა' });
});

module.exports = router;