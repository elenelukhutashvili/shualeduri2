const { z } = require('zod');

const blogCreateSchema = z.body({
  title: z.string().min(3, "სათაური უნდა იყოს მინიმუმ 3 სიმბოლო"),
  content: z.string().min(10, "კონტენტი უნდა იყოს მინიმუმ 10 სიმბოლო")
});

module.exports = { blogCreateSchema };