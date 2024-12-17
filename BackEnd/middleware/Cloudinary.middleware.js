const cloudinary = require('cloudinary').v2; // Make sure to use Cloudinary v2
const fs = require('fs'); // For file system operations
require('dotenv').config();


// MONGO_URL = mongodb://localhost:27017/DemoLink
// PORT=3000
// cloudinary_cloud_name=dhs2koq4i
// cloudinary_apiKey=352246637179152
// cloudinary_apiSecret=qV_JdoxbrjMtQYeTEZWVYPdFqXU

cloudinary.config({ 
  cloud_name: process.env.cloudinary_cloud_name, 
  api_key: process.env.cloudinary_apiKey, 
  api_secret: process.env.cloudinary_apiSecret
});

exports.uploadOnCloudinary = async (imagePath, option = {}) => {
  try {
    // Merge user-specified options with default options for user display pictures
    const uploadOptions = {
      folder: 'LinkBee/Users',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [
        { width: 300, height: 300, crop: 'fill', gravity: 'face' }
      ],
      ...option 
    };

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);
    console.log("The image is uploaded on Cloudinary:", result.url);

    // Delete the file from the local directory after successful upload
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Failed to delete the local file:', err);
      } else {
        console.log('Local file successfully deleted');
      }
    });

    return result.url;
  } catch (error) {
    console.log("An error occurred while uploading to Cloudinary:", error);
    throw error;
  }
};
