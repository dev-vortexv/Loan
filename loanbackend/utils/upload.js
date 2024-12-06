const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/documents/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/borrowersDocuments/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})
// Create multer upload middleware for the second folder

const upload = multer({ storage });
const uploadDocuments = multer({ storage: storage2 });

module.exports =  { upload, uploadDocuments };

