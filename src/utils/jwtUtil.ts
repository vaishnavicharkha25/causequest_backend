// src/utils/jwtUtil.ts
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';  // import StringValue from 'ms' package types
import dotenv from 'dotenv';
import type { TokenPayload, ShorthandTokenPayload, RefreshTokenPayload } from '../types/userData';
import MiddlewareType from '../constants/middlewareType';

dotenv.config({ path: '.env.development' });

const getExpiresIn = (envVar: string | undefined, defaultVal: StringValue): StringValue => {
  return (envVar as StringValue) || defaultVal;
};

class JWTUtil {
  private static secretKey = process.env.JWT_SECRET as string;

  public static generateToken = (tokenPayload: TokenPayload): string => {
    if (!JWTUtil.secretKey) throw new Error('JWT_SECRET is not defined in environment variables');
    
    const options: SignOptions = {
      expiresIn: getExpiresIn(process.env.JWT_TOKEN_EXPIRY, '1h')
    };

    return jwt.sign(
      { ...tokenPayload, type: MiddlewareType.ACCESS_TOKEN },
      JWTUtil.secretKey,
      options
    );
  };

  public static generateShorthandToken = (shorthandTokenPayload: ShorthandTokenPayload): string => {
    if (!JWTUtil.secretKey) throw new Error('JWT_SECRET is not defined in environment variables');
    
    const options: SignOptions = {
      expiresIn: getExpiresIn(process.env.JWT_SHORT_HAND_TOKEN_EXPIRY, '15m')
    };

    return jwt.sign(
      { ...shorthandTokenPayload, type: MiddlewareType.SHORT_HAND_TOKEN },
      JWTUtil.secretKey,
      options
    );
  };

  public static generateRefreshToken = (refreshTokenPayload: RefreshTokenPayload): string => {
    if (!JWTUtil.secretKey) throw new Error('JWT_SECRET is not defined in environment variables');
    
    const options: SignOptions = {
      expiresIn: getExpiresIn(process.env.JWT_REFRESH_TOKEN_EXPIRY, '7d')
    };

    return jwt.sign(
      { ...refreshTokenPayload, type: MiddlewareType.REFRESH_TOKEN },
      JWTUtil.secretKey,
      options
    );
  };

public static verifyToken = (token: string): object | string => {
  if (!JWTUtil.secretKey) throw new Error('JWT_SECRET is not defined in environment variables');

  try {
    return jwt.verify(token, JWTUtil.secretKey, { algorithms: ['HS256'] });
  } catch (error) {
    // Optional: log the actual error for debugging
    console.error('JWT verification error:', error);
    throw new Error('Invalid or expired token');
  }
};

}

export default JWTUtil;
