const mongoose = require('mongoose');
const Blog = require('./Blog');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

// Middleware: როცა მომხმარებელი იშლება, იშლება მისი ყველა ბლოგიც
UserSchema.pre('findOneAndDelete', async function (next) {
  const docToQuery = await this.model.findOne(this.getQuery());
  if (docToQuery) {
    await Blog.deleteMany({ author: docToQuery._id });
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);