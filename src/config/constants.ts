import { ConfigService } from '@nestjs/config';

let configService: ConfigService;

export function initializeConstants(config: ConfigService) {
  configService = config;
}

export const AppConstants = {
  get NODE_ENV(): string {
    return configService.get<string>('NODE_ENV') || 'development';
  },

  get PORT(): number {
    return configService.get<number>('PORT') || 3000;
  },

  get API_PREFIX(): string {
    return configService.get<string>('API_PREFIX') || 'api';
  },

  get APP_NAME(): string {
    return configService.get<string>('APP_NAME') || 'NestJS Store Data API';
  },

  get DB_HOST(): string {
    return configService.get<string>('DB_HOST') || 'localhost';
  },

  get DB_PORT(): number {
    return configService.get<number>('DB_PORT') || 5432;
  },

  get DB_USERNAME(): string {
    return configService.get<string>('DB_USERNAME') || 'postgres';
  },

  get DB_PASSWORD(): string {
    return configService.get<string>('DB_PASSWORD') || 'postgres';
  },

  get DB_NAME(): string {
    return configService.get<string>('DB_NAME') || 'nest_api';
  },

  get SMTP_HOST(): string {
    return configService.get<string>('SMTP_HOST') || 'smtp.gmail.com';
  },

  get SMTP_PORT(): number {
    return configService.get<number>('SMTP_PORT') || 587;
  },

  get SMTP_SECURE(): boolean {
    return configService.get<boolean>('SMTP_SECURE') || false;
  },

  get SMTP_USER(): string {
    return configService.get<string>('SMTP_USER') || '';
  },

  get SMTP_PASSWORD(): string {
    return configService.get<string>('SMTP_PASSWORD') || '';
  },

  get SMTP_FROM(): string {
    return configService.get<string>('SMTP_FROM') || configService.get<string>('SMTP_USER') || '';
  },

  get FIREBASE_SERVICE_ACCOUNT_PATH(): string {
    return configService.get<string>('FIREBASE_SERVICE_ACCOUNT_PATH') || '';
  },
};

