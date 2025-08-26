import { Router, Response } from 'express';
import userController from '../controllers/user.controller';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, (req: AuthRequest, res: Response) => userController.list(req, res));

export default router;
