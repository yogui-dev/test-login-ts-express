import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, (req, res) => userController.list(req as any, res));

export default router;
