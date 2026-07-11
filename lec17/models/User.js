const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    // 1) პროფილის ფოტო - არასავალდებულო ველი
    profileImage: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
    // 4) მონაცემთა რელაციის ნაწილი (ბლოგების მასივი)
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

// 4) როდესაც იუზერი იშლება, იშლება მისი ყველა ბლოგი
userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await mongoose.model('Blog').deleteMany({ author: this._id });
    next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);