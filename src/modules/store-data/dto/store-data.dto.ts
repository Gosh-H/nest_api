import { IsString, IsNotEmpty } from 'class-validator';

export class StoreDataDto {
  @IsString()
  @IsNotEmpty()
  someString: string;
}
