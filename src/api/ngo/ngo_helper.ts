import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/ngo_images/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `ngo_${Date.now()}${ext}`);
  }
});

export const uploadCoverImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
});
