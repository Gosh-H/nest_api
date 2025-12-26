import { IsEnum, IsNotEmpty } from 'class-validator';

export enum StoreType {
  DB = 'db',
  FILE = 'file',
}

export class StoreTypeHeaderDto {
  @IsEnum(StoreType, {
    message: 'StoreType must be either "db" or "file"',
  })
  @IsNotEmpty({
    message: 'StoreType header is required. Use "db" or "file"',
  })
  storeType: StoreType;
}
