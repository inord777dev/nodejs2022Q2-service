import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update

  toResponse() {
    const { id, login } = this;
    return { id, login };
  }

  constructor(createUserDto: CreateUserDto) {
    this.id = randomUUID();
    Object.assign(this, createUserDto);
    this.version = 1;
    const now = Date.now();
    this.createdAt = now;
    this.updatedAt = now;
  }
}
