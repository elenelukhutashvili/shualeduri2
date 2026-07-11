const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const isAuth = require('../middleware/isAuth');
const { upload, cloudinary, uploadToCloudinary } = require('../middleware/upload');

const router = express.Router();

// 1) რეგისტრაცია
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, birthDate } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "ელ-ფოსტა დაკავებულია!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword, birthDate });
        await newUser.save();

        res.status(201).json({ message: "რეგისტრაცია წარმატებულია!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 1) ავტორიზაცია
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "არასწორი მონაცემები!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "არასწორი მონაცემები!" });

        req.session.user = { id: user._id, email: user.email };
        res.json({ message: "ავტორიზაცია წარმატებულია!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2) პროფილის ფოტოს ატვირთვა და განახლება
router.put('/profile/image', isAuth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "გთხოვთ ატვირთოთ ფაილი" });

        const user = await User.findById(req.session.user.id);
        if (user.profileImage && user.profileImage.publicId) {
            await cloudinary.uploader.destroy(user.profileImage.publicId);
        }

        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        user.profileImage = { url: cloudinaryResult.secure_url, publicId: cloudinaryResult.public_id };
        await user.save();

        res.json({ message: "ფოტო განახლდა!", profileImage: user.profileImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2) პროფილის ფოტოს წაშლა
router.delete('/profile/image', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user.profileImage || !user.profileImage.publicId) {
            return res.status(400).json({ message: "ფოტო არ გაქვთ ატვირთული" });
        }

        await cloudinary.uploader.destroy(user.profileImage.publicId);
        user.profileImage = { url: "", publicId: "" };
        await user.save();

        res.json({ message: "ფოტო წაიშალა!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Multer-ის ერორების ჰენდლერი
router.use((error, req, res, next) => {
    return res.status(400).json({ message: error.message });
});

module.exports = router;