// Vercel Serverless Function: /api/config
module.exports = (req, res) => {
  res.json({
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || ""
  });
};
