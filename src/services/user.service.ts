import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

class UserService {
  private repo = AppDataSource.getRepository(User);

  async createUser(name: string, email: string, passwordHash: string) {
    const user = this.repo.create({ name, email, passwordHash });
    return this.repo.save(user);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findByEmailWithPassword(email: string) {
    return this.repo
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email })
      .getOne();
  }

  async listUsers() {
    return this.repo.find({ select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] });
  }
}

export default new UserService();
