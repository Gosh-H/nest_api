import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stored_data')
export class StoredData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  someString: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
