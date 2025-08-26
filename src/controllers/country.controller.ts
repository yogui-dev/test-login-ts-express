import { Request, Response } from 'express';
import countryService from '../services/country.service';

class CountryController {
  async list(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const result = await countryService.list(limit, page);
    return res.json(result);
  }
}

export default new CountryController();
