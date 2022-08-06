import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  requestShow(request: Request) {
    super.log(
      `Requests {url: ${request.originalUrl} method: ${
        request.method
      }, params: ${JSON.stringify(request.params)}, body: ${JSON.stringify(
        request.body,
      )}}`,
    );
  }

  responseShow(response, statuscode) {
    super.log(
      `Response {statusCode: ${statuscode} body: ${JSON.stringify(response)}}`,
    );
  }

  errorShow(res) {
    super.error(`Error ${JSON.stringify(res)}`);
  }
}
