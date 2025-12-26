import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { StoreDataController } from './store-data.controller';
import { StoreDataService } from './store-data.service';
import { StorageStrategyFactory } from './factories/storage-strategy.factory';
import { DatabaseStrategy } from './strategies/database-strategy';
import { FileStrategy } from './strategies/file-strategy';
import { StoredData } from './entities/stored-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoredData]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [StoreDataController],
  providers: [StoreDataService, StorageStrategyFactory, DatabaseStrategy, FileStrategy],
  exports: [StoreDataService],
})
export class StoreDataModule {}
