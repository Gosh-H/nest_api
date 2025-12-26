import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppConstants } from '../../config/constants';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      // Initialize nodemailer transporter lazily
      this.transporter = nodemailer.createTransport({
        host: AppConstants.SMTP_HOST,
        port: AppConstants.SMTP_PORT,
        secure: AppConstants.SMTP_SECURE, // true for 465, false for other ports
        auth: {
          user: AppConstants.SMTP_USER,
          pass: AppConstants.SMTP_PASSWORD,
        },
      });
    }
    return this.transporter;
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    
      const mailOptions = {
        from: AppConstants.SMTP_FROM,
        to,
        subject,
        text: body,
      };

      const transporter = this.getTransporter();
      const info = await transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${to}. MessageId: ${info.messageId}`);
  }
}

