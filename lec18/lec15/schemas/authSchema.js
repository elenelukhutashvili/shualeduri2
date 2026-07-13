const { z } = require('zod');

const registerSchema = z.body({
  fullName: z.string().min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს"),
  email: z.string().email("არასწორი ელ-ფოსტის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო"),
  birthDate: z.string().transform((str) => new Date(str))
});

const loginSchema = z.body({
  email: z.string().email("არასწორი ელ-ფოსტის ფორმატი"),
  password: z.string().min(1, "პაროლის შეყვანა სავალდებულოა")
});

module.exports = { registerSchema, loginSchema };