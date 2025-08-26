import { Router, Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', (req: Request, res: Response) => authController.login(req, res));

export default router;
