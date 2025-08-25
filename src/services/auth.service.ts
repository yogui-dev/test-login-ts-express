import jwt from 'jsonwebtoken';
import env from '../config/env';
import userService from './user.service';
import { comparePassword } from '../utils/password';
import { User } from '../entities/User';

class AuthService {
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await userService.findByEmailWithPassword(email);
    if (!user || !(user as any).passwordHash) return null;
    const valid = await comparePassword(password, (user as any).passwordHash);
    if (!valid) return null;
    delete (user as any).passwordHash;
    return user;
  }

  signToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
  }
}

export default new AuthService();
