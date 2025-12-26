import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { NotificationService } from '../notification/notification.service';
import { StoreType } from '../store-data/dto/store-type-header.dto';
import { SaveStringResult } from '../store-data/strategies/interfaces/storage-strategy.interface';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService,
  ) {}

  async notify(storeType: StoreType, data: SaveStringResult): Promise<void> {
    try {
      const title = 'Data Stored Successfully';

      switch (storeType) {
        case StoreType.DB:
          // Send push notification for database storage
          {
            const body = `Your data has been stored in the database.\nID: ${data.id}`;
            const notificationData = {
              dataId: data.id.toString(),
              data: data.someString,
              timestamp: new Date().toISOString(),
            };
            this.logger.log(`Start Push notification sent for data ID: ${data.id}`);
            await this.notificationService.sendPushNotification('', title, body, notificationData);
            this.logger.log(`End Push notification sent for data ID: ${data.id}`);
          }
          break;

        case StoreType.FILE:
          // Send email for file storage
          {
            const recipientEmail = 'user@example.com'; // This should come from user context or config
            const body = `Your data has been stored successfully.\n\nID: ${data.id}\nData: ${data.someString}\n\nStored at: ${data.createdAt.toISOString()}`;

            this.logger.log(`Start Email sent for data ID: ${data.id}`);
            await this.emailService.sendEmail(recipientEmail, title, body);
            this.logger.log(`Email sent for data ID: ${data.id}`);
          }
          break;

        default:
          this.logger.warn(`Unknown store type: ${storeType}`);
      }
    } catch (error) {
      this.logger.error(`Failed to send notification for data ID: ${data.id}: ${error.message}`);
    }
  }
}

