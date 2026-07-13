const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Middleware: როცა ბლოგი იშლება, მისი ID იშლება მომხმარებლის blogs მასივიდან
BlogSchema.pre('findOneAndDelete', async function (next) {
  const docToQuery = await this.model.findOne(this.getQuery());
  if (docToQuery) {
    await mongoose.model('User').findByIdAndUpdate(docToQuery.author, {
      $pull: { blogs: docToQuery._id }
    });
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);