import multer from "multer";
import path from "path";

// Create an absolute path to the destination directory
const destinationDirectory = path.resolve(__dirname, "../uploads");

// Configure Multer to store uploaded files in the specified directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

export default upload;
