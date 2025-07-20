import { Router } from 'express';
import { uploadCoverImage } from './ngo_helper';
import { signupNgo, signinNgo, getNgoProfile, updateNgoProfile, signoutNgo } from './ngo_controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const ngoRouter = Router();

// 🟢 Sign-Up Route
ngoRouter.post('/signup-ngo', uploadCoverImage.single('coverImage'), signupNgo);

// 🟢 Sign-In Route
ngoRouter.post('/signin-ngo', signinNgo);

ngoRouter.get('/profile', authMiddleware, getNgoProfile);

// 🟢 Update Profile
ngoRouter.put('/profile', authMiddleware, uploadCoverImage.single('coverImage'), updateNgoProfile);

ngoRouter.post('/logout', authMiddleware, signoutNgo)


export default ngoRouter;
