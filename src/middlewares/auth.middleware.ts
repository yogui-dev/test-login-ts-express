import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: number; email: string; iat: number; exp: number };
    req.user = { id: decoded.sub, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
