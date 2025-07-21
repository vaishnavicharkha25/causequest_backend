import { Request, Response, NextFunction } from 'express';
import { createNgoAccount, getNgoProfileByUserId, signInNgo, updateNgoProfileByUserId } from './ngo_service';
import path from 'path';
import supabase from './supabase'


// ✅ SIGN-UP Controller
export async function signupNgo(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      email, password,
      confirmPassword, phone, location,
      ngoName, ngoDescription,
      category, contactEmail, phoneNumber, website
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    let coverImageUrl = null;

    if (req.file) {
      const bucketName = 'ngo'; // your bucket name
      const ext = path.extname(req.file.originalname);
      const fileName = `ngo_${Date.now()}${ext}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error('Error uploading image to Supabase:', error);
        return res.status(500).json({ message: 'Image upload failed' });
      }

      // Get public URL for the uploaded file (assuming public bucket)
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      coverImageUrl = publicUrlData.publicUrl;
    } else {
      coverImageUrl = req.body.coverImageUrl || null;
    }

    const result = await createNgoAccount({
      email,
      password,
      confirmPassword,
      phone,
      location,
      ngoName,
      ngoDescription,
      category,
      contactEmail,
      phoneNumber,
      website,
      coverImageUrl
    });

    // Respond or call next middleware as you do currently
    res.status(201).json({ message: 'NGO created successfully', data: result });

  } catch (error) {
    console.error('signupNgo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// ✅ SIGN-IN Controller
export async function signinNgo(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await signInNgo(email, password);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// ngo_controller.ts

// ✅ GET NGO Profile
export async function getNgoProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.user_id; // assuming JWT middleware adds user
    const profile = await getNgoProfileByUserId(userId);
    return res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}

// ✅ UPDATE NGO Profile
export async function updateNgoProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.user_id;
    const updateData = req.body;

    if (updateData.email) {
      return res.status(400).json({ message: 'Email cannot be updated' });
    }

    const coverImageUrl = req.file
      ? `/uploads/ngo_images/${req.file.filename}`
      : null;

    await updateNgoProfileByUserId(userId, {
      ...updateData,
      ...(coverImageUrl && { coverImageUrl })
    });

    // ✅ Fetch updated profile
    const updatedProfile = await getNgoProfileByUserId(userId);

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  } catch (err) {
    next(err);
  }
}

export async function signoutNgo(req: Request, res: Response) {
  // If you're using HTTP-only cookies:
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
}

