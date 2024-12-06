import * as bcrypt from 'bcryptjs';
import env from '../config/env';

export default class BcryptHelper {
  static hashPassword = (password: string) => {
    try {
      return bcrypt.hashSync(password, env.BCRYPT_SALT_ROUND);
    } catch (error: any) {
      return;
    }
  };

  static comparePassword = (password: string, hashPassword: string) => {
    try {
      return bcrypt.compareSync(password, hashPassword);
    } catch (error: any) {
      return false;
    }
  };
}
