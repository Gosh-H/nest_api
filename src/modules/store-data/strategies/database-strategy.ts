import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoredData } from '../entities/stored-data.entity';
import { IStorageStrategy, SaveStringResult } from './interfaces/storage-strategy.interface';
import { AppConstants } from '../../../config/constants';

@Injectable()
export class DatabaseStrategy implements IStorageStrategy {
  private readonly logger = new Logger(DatabaseStrategy.name);

  constructor(
    @InjectRepository(StoredData)
    private readonly storedDataRepository: Repository<StoredData>,
  ) {}

  async saveString(data: string): Promise<SaveStringResult> {
    // Create new entity instance
    const storedData = this.storedDataRepository.create({
      someString: data,
    });

    // Save to database
    const savedData = await this.storedDataRepository.save(storedData);

    // Log the operation
    this.logger.log(`[${AppConstants.APP_NAME}] Stored data in database`);
    this.logger.log(`ID: ${savedData.id}, String value: ${savedData.someString}`);
    this.logger.log(`Created at: ${savedData.createdAt}`);
    this.logger.log(`Environment: ${AppConstants.NODE_ENV}`);

    return {
      id: savedData.id,
      someString: savedData.someString,
      createdAt: savedData.createdAt,
    };
  }
}
