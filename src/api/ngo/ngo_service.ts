import bcrypt from 'bcrypt';
import { NgoMaster } from '../../database/models/ngo_master';
import { UserMaster } from '../../database/models/user_master';
import JWTUtil from '../../utils/jwtUtil';

interface SignupDto {
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  location?: string;
  ngoName: string;
  ngoDescription: string;
  category: string;
  contactEmail: string;
  phoneNumber: string;
  website?: string;
  coverImageUrl?: string | null;
}

// ✅ SIGN-UP
export async function createNgoAccount(dto: SignupDto) {
  const existing = await UserMaster.findOne({ where: { Email: dto.email } });
  if (existing) {
    throw { status: 409, message: 'Email already registered' };
  }

  const hashed = await bcrypt.hash(dto.password, 10);

  const user = await UserMaster.create({
    Name: dto.ngoName,
    Email: dto.email,
    PasswordHash: hashed,
    RoleId: 1,
    ProfileImage: dto.coverImageUrl,
    IsActive: true,
    CreatedBy: 0,
    CreatedOn: new Date()
  });

  await NgoMaster.create({
    UserId: user.UserId,
    Name: dto.ngoName,
    Description: dto.ngoDescription,
    ContactEmail: dto.contactEmail,
    PhoneNumber:dto.phoneNumber,
    Category: dto.category,
    ImageUrl: dto.coverImageUrl,
    Location: dto.location,
    Website: dto.website,
    IsActive: true,
    CreatedBy: user.UserId,
    CreatedOn: new Date()
  });

  return {
    success: true,
    user: {
      userId: user.UserId,
      email: user.Email,
      role: 'ngo'
    }
  };
}

// ✅ SIGN-IN
export async function signInNgo(email: string, password: string) {
  const user = await UserMaster.findOne({
    where: { Email: email, IsActive: true }
  });

  if (!user) {
    throw { status: 404, message: 'User not found or inactive' };
  }

  const isMatch = await bcrypt.compare(password, user.PasswordHash);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = JWTUtil.generateToken({
    user_id: user.UserId,
    role: 'ngo'
  });

  return {
    success: true,
    message: 'Login successful',
    token,
    user: {
      userId: user.UserId,
      email: user.Email,
      name: user.Name,
      role: 'ngo'
    }
  };
}

// ngo_service.ts
export async function getNgoProfileByUserId(userId: number) {
  const user = await UserMaster.findOne({
    where: { UserId: userId },
    attributes: ['UserId', 'Name', 'Email', 'ProfileImage']
  });

  const ngo = await NgoMaster.findOne({
    where: { UserId: userId },
    attributes: ['Name', 'Description', 'Category', 'ContactEmail', 'PhoneNumber', 'ImageUrl', 'Location', 'Website']
  });

  if (!user || !ngo) {
    throw { status: 404, message: 'Profile not found' };
  }

  return { ...user.toJSON(), ngoDetails: ngo.toJSON() };
}

export async function updateNgoProfileByUserId(userId: number, updateData: any) {
  const user = await UserMaster.findOne({ where: { UserId: userId } });
  const ngo = await NgoMaster.findOne({ where: { UserId: userId } });

  if (!user || !ngo) {
    throw { status: 404, message: 'Profile not found' };
  }

  // Update UserMaster fields
  if (updateData.ngoName) {
    user.Name = updateData.ngoName;
    ngo.Name = updateData.ngoName;
  }

  if (updateData.coverImageUrl) {
    user.ProfileImage = updateData.coverImageUrl;
    ngo.ImageUrl = updateData.coverImageUrl;
  }

  // Update NgoMaster fields
  if (updateData.ngoDescription) ngo.Description = updateData.ngoDescription;
  if (updateData.category) ngo.Category = updateData.category;
  if (updateData.contactEmail) ngo.ContactEmail = updateData.contactEmail;
  if (updateData.phoneNumber) ngo.PhoneNumber = updateData.phoneNumber;
  if (updateData.location) ngo.Location = updateData.location;
  if (updateData.website) ngo.Website = updateData.website;
  

  await user.save();
  await ngo.save();

  return { message: 'Profile updated successfully' };
}


