import { AsyncLocalStorage } from 'async_hooks';
import { StoreType } from '../dto/store-type-header.dto';

export class StoreTypeContext {
  private static readonly asyncLocalStorage = new AsyncLocalStorage<StoreType>();

  static set(storeType: StoreType): void {
    this.asyncLocalStorage.enterWith(storeType);
  }

  static get(): StoreType | undefined {
    return this.asyncLocalStorage.getStore();
  }
}
