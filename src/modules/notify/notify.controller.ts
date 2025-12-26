import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IDataStoredEvent } from './interfaces/data-stored.interface';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @OnEvent('data.stored')
  handleDataStoredEvent(event: IDataStoredEvent) {
    this.notifyService.notify(event.storeType, event.data);
  }
}

