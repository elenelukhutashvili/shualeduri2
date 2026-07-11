const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary-ის კონფიგურაცია (.env ფაილიდან)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ფაილის შენახვა მეხსიერებაში (ბაფერში) - იდეალურია სერვერლეს გარემოსთვის
const storage = multer.memoryStorage();

// პუნქტი 3: ლიმიტები და მხოლოდ ფოტოების ატვირთვის შესაძლებლობა
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 2 * 1024 * 1024 // ლიმიტი: მაქსიმუმ 2 მეგაბაიტი
    },
    fileFilter: (req, file, cb) => {
        // ვამოწმებთ, რომ ფაილის ტიპი იწყებოდეს იმიჯით (მაგ. image/jpeg, image/png)
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('მხოლოდ ფოტოების ატვირთვაა ნებადართული!'), false);
        }
    }
});

// Cloudinary-ზე ატვირთვის დამხმარე ფუნქცია ბაფერიდან
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'gita_profiles' }, // საქაღალდის სახელი Cloudinary-ზე
            (error, result) => {
                if (error) return reject(error);
                resolve(result); // აბრუნებს ობიექტს, სადაც არის secure_url და public_id
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = { upload,cloudinary, uploadToCloudinary };