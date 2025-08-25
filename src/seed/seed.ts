import 'reflect-metadata';
import AppDataSource from '../config/data-source';
import env from '../config/env';
import userService from '../services/user.service';
import { hashPassword } from '../utils/password';

async function run() {
  try {
    await AppDataSource.initialize();

    const existing = await userService.findByEmail(env.ADMIN_EMAIL);
    if (!existing) {
      const passwordHash = await hashPassword(env.ADMIN_PASSWORD);
      const user = await userService.createUser(env.ADMIN_NAME, env.ADMIN_EMAIL, passwordHash);
      console.log('Created admin user:', { id: user.id, email: user.email });
    } else {
      console.log('Admin user already exists:', existing.email);
    }

    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

run();
