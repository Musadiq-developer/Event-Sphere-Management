import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const fileFilter = (req, file, cb) => {
  // webp aur pdf ko list mein shamil kiya
  const allowedTypes = [
    'image/jpeg', 
    'image/png', 
    'image/jpg', 
    'image/webp', 
    'application/pdf'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Agar type match nahi karti to ye error throw karta hai jo 500 error ban jata hai
    cb(new Error(`Invalid file type (${file.mimetype}). Only Images and PDFs are allowed!`), false);
  }
};
export const upload = multer({ storage, fileFilter });