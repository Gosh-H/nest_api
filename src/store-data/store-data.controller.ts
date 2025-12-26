import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { StoreDataService } from './store-data.service';
import { StoreDataDto } from './dto/store-data.dto';
import { StoreTypeInterceptor } from './interceptors/store-type.interceptor';

@Controller('store')
@UseInterceptors(StoreTypeInterceptor)
export class StoreDataController {
  constructor(private readonly storeDataService: StoreDataService) {}

  @Post()
  async store(@Body() storeDataDto: StoreDataDto) {
    const savedData = await this.storeDataService.storeData(storeDataDto);

    return {
      id: savedData.id,
      someString: savedData.someString,
      createdAt: savedData.createdAt,
    };
  }
}
