import { ISessionAccount } from '../../interfaces/auth';

declare module 'express-session' {
  interface SessionData {
    account: ISessionAccount;
  }
}
