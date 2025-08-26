import { AppDataSource } from '../config/data-source';
import { Country } from '../entities/Country';

class CountryService {
  private repo = AppDataSource.getRepository(Country);

  async list(limit: number, page: number) {
    const take = Math.min(Math.max(limit || 10, 1), 100);
    const currentPage = Math.max(page || 1, 1);
    const skip = (currentPage - 1) * take;

    const [data, total] = await this.repo.findAndCount({
      order: { name: 'ASC' },
      skip,
      take,
      select: ['id', 'iso2', 'iso3', 'name', 'createdAt', 'updatedAt']
    });

    const pages = Math.max(Math.ceil(total / take), 1);

    return {
      data,
      meta: { total, page: currentPage, limit: take, pages }
    };
  }
}

export default new CountryService();
