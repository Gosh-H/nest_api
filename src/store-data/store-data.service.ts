import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StoreDataDto } from './dto/store-data.dto';
import { StorageStrategyFactory } from './factories/storage-strategy.factory';
import { SaveStringResult } from './strategies/interfaces/storage-strategy.interface';
import { StoreTypeContext } from './context/store-type.context';
import { IDataStoredEvent } from '../notify/interfaces/data-stored.interface';

@Injectable()
export class StoreDataService {
  constructor(
    private readonly strategyFactory: StorageStrategyFactory,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async storeData(data: StoreDataDto): Promise<SaveStringResult> {
    const storeType = StoreTypeContext.get();

    const strategy = this.strategyFactory.getStrategy(storeType);
    const result = await strategy.saveString(data.someString);

    // Emit event after data is stored
    this.eventEmitter.emit('data.stored', {storeType,data: result});

    return result;
  }
}
