const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const isAuth = require('../middleware/isAuth');
const { blogCreateSchema } = require('../schemas/blogSchema');

// ყველა ბლოგის როუტი დაცულია isAuth-ით
router.use(isAuth);

// CREATE - ბლოგის შექმნა
router.post('/', async (req, res) => {
  try {
    blogCreateSchema.parse({ body: req.body });

    const { title, content } = req.body;
    
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id // მოდის JWT-დან
    });

    const blog = await newBlog.save();

    // ვამატებთ ბლოგის ID-ს მომხმარებლის მასივში
    await User.findByIdAndUpdate(req.user.id, { $push: { blogs: blog._id } });

    res.status(201).json(blog);
  } catch (err) {
    if (err.errors) return res.status(400).json({ errors: err.errors });
    res.status(500).send('Server Error');
  }
});

// READ ALL - ყველა ბლოგის წაკითხვა
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'fullName email');
    res.json(blogs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// UPDATE - ბლოგის განახლება (მხოლოდ მფლობელს შეუძლია)
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'ბლოგი ვერ მოიძებნა' });

    // ბლოგის მფლობელობის შემოწმება (Point 6)
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'მოქმედება უარყოფილია: ეს ბლოგი თქვენ არ გეკუთვნით' });
    }

    blogCreateSchema.parse({ body: req.body });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    await blog.save();
    res.json(blog);
  } catch (err) {
    if (err.errors) return res.status(400).json({ errors: err.errors });
    res.status(500).send('Server Error');
  }
});

// DELETE - ბლოგის წაშლა (მხოლოდ მფლობელს შეუძლია)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'ბლოგი ვერ მოიძებნა' });

    // ბლოგის მფლობელობის შემოწმება (Point 6)
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'მოქმედება უარყოფილია: ეს ბლოგი თქვენ არ გეკუთვნით' });
    }

    // ვიყენებთ findOneAndDelete-ს, რათა ამოქმედდეს მოდელში გაწერილი pre middleware (Point 4)
    await Blog.findOneAndDelete({ _id: req.params.id });

    res.json({ message: 'ბლოგი წარმატებით წაიშალა და მოიხსნა მომხმარებლის სიიდან' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;