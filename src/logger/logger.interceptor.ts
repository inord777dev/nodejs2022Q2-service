import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { tap } from 'rxjs/operators';
import { MyLogger } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new MyLogger('Fail');

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();

    this.logger.requestShow(req);

    return next
      .handle()
      .pipe(tap((data) => this.logger.responseShow(data, statusCode)));
  }
}
