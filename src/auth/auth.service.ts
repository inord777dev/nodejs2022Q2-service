import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';
import { User } from 'src/users/entities/user.entity';
import { authConstants } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly storeService: StoreService,
    private jwtService: JwtService,
  ) {}

  async validate(login: string, password: string) {
    return await this.storeService.validate(login, password);
  }

  signUp(login: string, password: string) {
    return this.storeService.createUser(login, password);
  }

  async signIn(login: string, password: string) {
    const user = await this.validate(login, password);
    return this.getTokens(user);
  }

  getTokens(user: User) {
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: authConstants.accessSecret,
        expiresIn: authConstants.accessExpires,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: authConstants.refreshSecret,
        expiresIn: authConstants.refreshExpires,
      }),
    };
  }

  async refresh(refreshToken: string) {
    try {
      const isVerify = await this.jwtService.verify(refreshToken, {
        secret: authConstants.refreshSecret,
      });
      if (!isVerify) {
        throw new Error();
      }
      const userId = await this.jwtService.decode(refreshToken)['userId'];
      const user = await this.storeService.getUser(userId);
      return this.getTokens(user);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
