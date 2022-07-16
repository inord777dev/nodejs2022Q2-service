import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(createUserDto: CreateUserDto) {
    this.id = randomUUID();
    Object.assign(this, createUserDto);
    this.version = 1;
    const now = Date.now();
    this.createdAt = now;
    this.updatedAt = now;
  }
}
