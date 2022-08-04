import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  validate(login: string, password: string) {
    return this.storeService.validate(login, password);
  }

  signUp(login: string, password: string) {
    return this.storeService.createUser(login, password);
  }

  async signIn(login: string, password: string) {
    const user = await this.validate(login, password);
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  refresh(refreshToken: string) {
    return {
      accessToken: '',
      refreshToken: refreshToken,
    };
  }
}
