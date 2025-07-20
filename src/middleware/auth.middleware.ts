// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import JWTUtil from '../utils/jwtUtil';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
const token = req.headers.authorization?.split(' ')[1] || req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = JWTUtil.verifyToken(token);
 (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
