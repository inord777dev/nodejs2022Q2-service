import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { AuthDto } from './dto/auth.dto';
import { MyLogger } from 'src/logger/logger.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext('AuthController');
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: AuthDto })
  @Post('signup')
  @HttpCode(201)
  signUp(@Body(new ValidationPipe()) authDto: AuthDto) {
    return this.authService.signUp(authDto.login, authDto.password);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: AuthDto })
  @Post('login')
  @HttpCode(200)
  async signIn(
    @Body(new ValidationPipe())
    authDto: AuthDto,
    @Request() req,
  ) {
    this.myLogger.requestShow(req);
    const result = await this.authService.signIn(
      authDto.login,
      authDto.password,
    );
    this.myLogger.responseShow(result, req);
    return result;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: RefreshDto })
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body(new ValidationPipe()) refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto.refreshToken);
  }
}
