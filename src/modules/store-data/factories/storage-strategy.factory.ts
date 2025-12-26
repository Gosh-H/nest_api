import { Injectable } from '@nestjs/common';
import { StoreType } from '../dto/store-type-header.dto';
import { IStorageStrategy } from '../strategies/interfaces/storage-strategy.interface';
import { DatabaseStrategy } from '../strategies/database-strategy';
import { FileStrategy } from '../strategies/file-strategy';
import { StoreTypeContext } from '../context/store-type.context';

@Injectable()
export class StorageStrategyFactory {
  constructor(
    private readonly databaseStrategy: DatabaseStrategy,
    private readonly fileStrategy: FileStrategy,
  ) {}

  getStrategy(storeType: StoreType): IStorageStrategy {
    switch (storeType) {
      case StoreType.DB:
        return this.databaseStrategy;
      case StoreType.FILE:
        return this.fileStrategy;
      default:
        throw new Error(`Unknown storage type: ${storeType}`);
    }
  }
}
