const express = require('express');
const User = require('../models/User');
const isAuth = require('../middleware/isAuth'); // შენი აუტენტიფიკაციის მიდლვერი
const { upload, cloudinary, uploadToCloudinary } = require('../middleware/upload');

const router = express.Router();

// ატვირთვა და განახლება (PUT მეთოდით)
router.put('/profile/image', isAuth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "გთხოვთ ატვირთოთ ფაილი" });
        }

        // ვპოულობთ მიმდინარე ავტორიზებულ იუზერს
        const user = await User.findById(req.session.user.id); // ან req.user.id, გააჩნია როგორ გაქვს სესია
        if (!user) return res.status(404).json({ message: "მომხმარებელი ვერ მოიძებნა" });

        // განახლების ლოგიკა: თუ მომხმარებელს უკვე ჰქონდა ძველი ფოტო, ჯერ ვშლით Cloudinary-დან
        if (user.profileImage && user.profileImage.publicId) {
            await cloudinary.uploader.destroy(user.profileImage.publicId);
        }

        // ახალი ფოტოს ატვირთვა Cloudinary-ზე
        const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

        // მონაცემების შენახვა ბაზაში
        user.profileImage = {
            url: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id
        };
        await user.save();

        res.json({
            message: "პროფილის ფოტო წარმატებით განახლდა!",
            profileImage: user.profileImage
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// წაშლა (DELETE მეთოდით)
router.delete('/profile/image', isAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user) return res.status(404).json({ message: "მომხმარებელი ვერ მოიძებნა" });

        // ვამოწმებთ, საერთოდ აქვს თუ არა ფოტო ატვირთული
        if (!user.profileImage || !user.profileImage.publicId) {
            return res.status(400).json({ message: "მომხმარებელს პროფილის ფოტო არ აქვს" });
        }

        // ფოტოს წაშლა Cloudinary-დან publicId-ის საშუალებით
        await cloudinary.uploader.destroy(user.profileImage.publicId);

        // ბაზაში ფილდების გასუფთავება
        user.profileImage = { url: "", publicId: "" };
        await user.save();

        res.json({ message: "პროფილის ფოტო წარმატებით წაიშალა" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// სპეციალური მიდლვერი Multer-ის ერორების დასაჭერად (მაგალითად, თუ აიტვირთა არაფოტო ან ფაილი დიდია ლიმიტზე)
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: "ფაილის ზომა დიდია! ლიმიტია 2MB." });
        }
        return res.status(400).json({ error: error.message });
    } else if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
});

module.exports = router;