import { Response } from 'express';
import userService from '../services/user.service';
import { AuthRequest } from '../middlewares/auth.middleware';

class UserController {
  async list(req: AuthRequest, res: Response) {
    const users = await userService.listUsers();
    return res.json(users);
  }
}

export default new UserController();
