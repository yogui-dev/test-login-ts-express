import { Router, Request, Response } from 'express';
import countryController from '../controllers/country.controller';

const router = Router();

// Público: GET /api/countries?limit=10&page=1
router.get('/', (req: Request, res: Response) => countryController.list(req, res));

export default router;
