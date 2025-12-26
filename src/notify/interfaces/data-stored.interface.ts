import { StoreType } from '../../store-data/dto/store-type-header.dto';
import { SaveStringResult } from '../../store-data/strategies/interfaces/storage-strategy.interface';

export interface IDataStoredEvent {
  storeType: StoreType;
  data: SaveStringResult;
}

