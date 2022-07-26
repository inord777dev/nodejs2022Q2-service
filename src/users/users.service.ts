import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly storeService: StoreService) {}

  findAll() {
    return this.storeService.getUsers();
  }

  findOne(id: string) {
    return this.storeService.getUser(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.storeService.createUser(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.storeService.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.storeService.deleteUser(id);
  }
}
