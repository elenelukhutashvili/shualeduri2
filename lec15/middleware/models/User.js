const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    // 1) პროფილის ფოტო ბაზაში, რომელიც არის არასავალდებულო ფილდი
    profileImage: {
        url: { type: String, default: "" },
        publicId: { type: String, default: "" }
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);