import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  updatedAt: number; // timestamp of last update

  toResponse(): User {
    const response = new User();
    Object.assign(response, this);
    return new User();
  }
}
