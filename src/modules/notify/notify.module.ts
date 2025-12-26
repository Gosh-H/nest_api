import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { EmailModule } from '../email/email.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [EmailModule, NotificationModule],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}

