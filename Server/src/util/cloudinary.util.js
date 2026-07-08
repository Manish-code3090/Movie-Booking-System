import { v2 } from "cloudinary";

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    try {
      // Upload the image
      const result = await v2.uploader.upload(imagePath, options);
      // console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
};