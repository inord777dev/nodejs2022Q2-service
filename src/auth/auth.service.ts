import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/singIn.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(private readonly storeService: StoreService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.storeService.createUser(createUserDto);
  }

  signIn(signInDto: SignInDto) {
    return this.storeService.login(signInDto);
  }

  refresh(refreshDto: RefreshDto) {
    return this.storeService.refreshToken(refreshDto);
  }
}
