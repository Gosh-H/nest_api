import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AppConstants } from '../config/constants';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private firebaseAdmin: admin.app.App | null = null;

  private getFirebaseAdmin(): admin.app.App {
    if (!this.firebaseAdmin) {
      // Initialize Firebase Admin SDK lazily
      if (!admin.apps.length) {
        const serviceAccountPath = AppConstants.FIREBASE_SERVICE_ACCOUNT_PATH;

        if (!serviceAccountPath) {
          throw new Error('Firebase service account path is not configured');
        }

        // Load service account from file
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require(serviceAccountPath);

        this.firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } else {
        this.firebaseAdmin = admin.app();
      }
    }
    return this.firebaseAdmin;
  }

  async sendPushNotification(
    token: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<void> {
    const firebaseAdmin = this.getFirebaseAdmin();

    const message: admin.messaging.Message = {
      token: token,
      notification: {
        title,
        body,
      },
      data: data,
    };

    const response = await firebaseAdmin.messaging().send(message);
    this.logger.log(`Push notification sent successfully. MessageId: ${response}`);
  }
}
