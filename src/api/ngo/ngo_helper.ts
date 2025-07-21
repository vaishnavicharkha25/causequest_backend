// uploadMiddleware.ts (or .js)
import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory for cloud upload

export const uploadCoverImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});
