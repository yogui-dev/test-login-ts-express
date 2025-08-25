import bcrypt from 'bcryptjs';
import env from '../config/env';

export const hashPassword = async (plain: string) => {
  const salt = await bcrypt.genSalt(env.BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
};

export const comparePassword = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};
