import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreDataModule } from './modules/store-data/store-data.module';
import { NotifyModule } from './modules/notify/notify.module';
import { StoredData } from './modules/store-data/entities/stored-data.entity';
import { validate } from './config/env.validation';
import { AppConstants, initializeConstants } from './config/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Initialize constants for use in TypeORM config
        initializeConstants(configService);
        return {
          type: 'postgres',
          host: AppConstants.DB_HOST,
          port: AppConstants.DB_PORT,
          username: AppConstants.DB_USERNAME,
          password: AppConstants.DB_PASSWORD,
          database: AppConstants.DB_NAME,
          entities: [StoredData],
          synchronize: AppConstants.NODE_ENV !== 'production', // Auto-create tables in dev
        };
      },
      inject: [ConfigService],
    }),
    StoreDataModule,
    NotifyModule,
  ],
})
export class AppModule {}
