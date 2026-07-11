const express = require('express');
const Blog = require('../models/Blog');
const User = require('../models/User');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// 5) ყველა ბლოგის როუტი დაცულია isAuth middleware-ით
router.use(isAuth);

// 3) ბლოგის შექმნა (CREATE)
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({ title, content, author: req.session.user.id });
        await newBlog.save();

        await User.findByIdAndUpdate(req.session.user.id, { $push: { blogs: newBlog._id } });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3) ყველა ბლოგის წაკითხვა (READ)
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'fullName profileImage');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3) ბლოგის განახლება (UPDATE) + 6) მფლობელობის შემოწმება
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "ბლოგი ვერ მოიძებნა" });

        if (blog.author.toString() !== req.session.user.id) {
            return res.status(403).json({ message: "თქვენ არ გაქვთ ამ ბლოგის შეცვლის უფლება!" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3) ბლოგის წაშლა (DELETE) + 6) მფლობელობის შემოწმება + 4) რელაცია
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "ბლოგი ვერ მოიძებნა" });

        if (blog.author.toString() !== req.session.user.id) {
            return res.status(403).json({ message: "თქვენ არ გაქვთ ამ ბლოგის წაშლის უფლება!" });
        }

        await Blog.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(req.session.user.id, { $pull: { blogs: req.params.id } });

        res.json({ message: "ბლოგი წაიშალა!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;