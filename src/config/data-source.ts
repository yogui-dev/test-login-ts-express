import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';
import fs from 'fs';
import env from './env';
import { User } from '../entities/User';
import { Country } from '../entities/Country';

const dbFile = path.isAbsolute(env.DB_PATH) ? env.DB_PATH : path.resolve(process.cwd(), env.DB_PATH);

// Asegura que el directorio exista
const dir = path.dirname(dbFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbFile,
  entities: [User, Country],
  synchronize: true, // Solo para dev
  logging: env.NODE_ENV !== 'production'
});

export default AppDataSource;
