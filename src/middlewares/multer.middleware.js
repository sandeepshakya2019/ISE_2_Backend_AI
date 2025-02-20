import path from "path";
import multer from "multer";

// Configure storage settings for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp and random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Extract the original file extension
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Export the multer upload middleware with configured storage
export const upload = multer({ storage: storage });
