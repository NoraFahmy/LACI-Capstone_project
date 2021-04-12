const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// This setups our account details to cloudinary with our environment variables
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// Some config settings. You can check them out in the multer-storage-cloudinary docs
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'Laci Capstone',
		allowedFormats: ['jpeg', 'png', 'jpg'],
	},
});

module.exports = {
	cloudinary,
	storage,
};