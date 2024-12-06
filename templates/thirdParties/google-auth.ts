import { OAuth2Client, TokenPayload } from 'google-auth-library';
import logger from '../utils/config/logger';

const oAuth2ClientId = '';
const oAuth2Client = new OAuth2Client({
  clientId: oAuth2ClientId,
});

class GoogleAuthService {
  static verifyIdToken = async (googleIdToken: string): Promise<TokenPayload | undefined> => {
    const labelLog = '[shared/google-auth.ts] [verifyIdToken]';
    logger.info(`${labelLog} googleIdToken -> ${googleIdToken}`);

    try {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: googleIdToken,
        audience: oAuth2ClientId,
      });

      const payload = ticket.getPayload();
      logger.debug(`${labelLog} payload -> ${payload}`);

      return payload;
    } catch (error: any) {
      logger.error(`${labelLog} error -> ${error.message}`);
      return;
    }
  };
}

export default GoogleAuthService;
