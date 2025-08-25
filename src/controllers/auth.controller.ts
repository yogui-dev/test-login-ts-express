import { Request, Response } from 'express';
import authService from '../services/auth.service';

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const user = await authService.validateUser(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = authService.signToken(user);
    return res.json({ token, user });
  }
}

export default new AuthController();
