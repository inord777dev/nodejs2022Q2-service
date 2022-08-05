import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  requestShow(request: Request) {
    super.log(
      `Requests {${request.url}, params: ${JSON.stringify(
        request.params,
      )}, body: ${JSON.stringify(request.body)}}`,
    );
  }

  responseShow(response, statuscode) {
    super.log(`Response ${statuscode} ${JSON.stringify(response)}`);
  }

  errorShow(error: Error) {
    super.error(`Error ${JSON.stringify(error)}`);
  }
}
