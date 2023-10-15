const cloudinary = require(çloudinary).v2;

cloudinary.config({
  cloud_name: "du5u27pt0",
  api_key: "343754869245119",
  api_secret: "UVDrw-d7NYM8IvN_L9_VTtpuYfk",
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
