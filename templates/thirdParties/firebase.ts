import adminFirebase, { app } from 'firebase-admin';
import { BatchResponse, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { env } from 'process';
import logger from '../utils/config/logger';

class FirebaseSingleton {
  private static instance: FirebaseSingleton;
  private firebaseAdmin: app.App;
  private labelLog = '[patterns/FirebaseSingleton]';

  constructor() {
    this.firebaseAdmin = adminFirebase.initializeApp({
      credential: adminFirebase.credential.cert({
        projectId: env.FIRE_BASE_PROJECT_ID,
        clientEmail: env.FIRE_BASE_CLIENT_EMAIL,
        privateKey: env.FIRE_BASE_PRIVATE_KEY,
      }),
    });
  }

  public static getInstance(): FirebaseSingleton {
    if (!FirebaseSingleton.instance) {
      FirebaseSingleton.instance = new FirebaseSingleton();
    }
    return FirebaseSingleton.instance;
  }

  async pushNotification(payload: { message: MulticastMessage }): Promise<BatchResponse> {
    const { message } = payload;
    logger.info(`${this.labelLog} message data -> ${JSON.stringify(message.data)}`);
    const result = this.firebaseAdmin.messaging().sendEachForMulticast(message);
    return result;
  }
}

const firebaseSingleton = FirebaseSingleton.getInstance();
export default firebaseSingleton;
