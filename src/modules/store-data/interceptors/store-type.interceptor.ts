import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { StoreTypeContext } from '../context/store-type.context';
import { StoreTypeHeaderDto } from '../dto/store-type-header.dto';

@Injectable()
export class StoreTypeInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const storeType = request.headers?.storetype || request.headers?.storeType;

    const dto = plainToInstance(StoreTypeHeaderDto, {
      storeType: storeType?.toLowerCase(),
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
      throw new BadRequestException(errorMessages.join(', '));
    }

    StoreTypeContext.set(dto.storeType);

    return next.handle();
  }
}
