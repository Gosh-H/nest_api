import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IStorageStrategy, SaveStringResult } from './interfaces/storage-strategy.interface';
import { AppConstants } from '../../config/constants';

@Injectable()
export class FileStrategy implements IStorageStrategy {
  private readonly logger = new Logger(FileStrategy.name);
  private readonly storageDir = 'storage';
  private readonly storageFile = 'stored-data.json';

  async saveString(data: string): Promise<SaveStringResult> {
    const filePath = join(this.storageDir, this.storageFile);

    try {
      // Ensure storage directory exists
      await fs.mkdir(this.storageDir, { recursive: true });

      // Read existing data
      let storedData: Array<{ id: string; someString: string; createdAt: string }> = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        storedData = JSON.parse(fileContent);
      } catch (error) {
        // File doesn't exist yet, start with empty array
        storedData = [];
      }

      // Create new entry with UUID
      const newEntry = {
        id: uuidv4(),
        someString: data,
        createdAt: new Date().toISOString(),
      };

      // Add to array and save
      storedData.push(newEntry);
      await fs.writeFile(filePath, JSON.stringify(storedData, null, 2), 'utf-8');

      this.logger.log(`[${AppConstants.APP_NAME}] Stored data in file`);
      this.logger.log(`ID: ${newEntry.id}, String value: ${newEntry.someString}`);
      this.logger.log(`Created at: ${newEntry.createdAt}`);
      this.logger.log(`Environment: ${AppConstants.NODE_ENV}`);

      return {
        id: newEntry.id,
        someString: newEntry.someString,
        createdAt: new Date(newEntry.createdAt),
      };
    } catch (error) {
      this.logger.error(`Error storing data to file: ${error.message}`);
      throw error;
    }
  }
}
