import 'dotenv/config';
import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const maxSize = Number(process.env.LOG_MAX_SIZE) || 1024 * 1024;
const logLevel = Number(process.env.LOG_LEVEL) || 5;
const LOG_APP = 'app';
const LOG_EROOR = 'error';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  constructor(contex?: string) {
    super(contex);
    const levels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    super.setLogLevels(levels.slice(0, logLevel));
  }

  addToFile(message: string, prefix: string) {
    try {
      fs.readdir(__dirname, { withFileTypes: true }, (error, files) => {
        const logs = [];
        for (const file of files) {
          if (file.name.endsWith(prefix) && file.name.startsWith(prefix)) {
            logs.push(file);
          }
        }
        let fileName = '';
        if (logs.length) {
          logs.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
          fileName = logs[logs.length - 1].name;
          const stats = fs.statSync(path.resolve(__dirname, '..', fileName));
          if (stats.size >= maxSize - 1000) {
            fileName = `${prefix}${logs.length}.log`;
          }
        } else {
          fileName = `${prefix}.log`;
        }
        fs.appendFile(
          path.resolve(__dirname, '..', fileName),
          `${new Date()} ${message}\n`,
          (err) => {
            if (err) throw err;
          },
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  log(message: string) {
    super.log(message);
    this.addToFile(message, LOG_APP);
  }

  error(message: string) {
    super.error(message);
    this.addToFile(message, LOG_EROOR);
  }

  warn(message: string) {
    super.warn(message);
    this.addToFile(message, LOG_APP);
  }

  debug(message: string) {
    super.debug(message);
    this.addToFile(message, LOG_APP);
  }

  verbose(message: string) {
    super.verbose(message);
    this.addToFile(message, LOG_APP);
  }

  requestShow(request: Request) {
    this.log(
      `Requests {url: ${request.originalUrl} method: ${
        request.method
      }, params: ${JSON.stringify(request.params)}, body: ${JSON.stringify(
        request.body,
      )}}`,
    );
  }

  responseShow(response, statuscode) {
    this.log(
      `Response {statusCode: ${statuscode} body: ${JSON.stringify(response)}}`,
    );
  }

  errorShow(res) {
    this.error(`Error ${JSON.stringify(res)}`);
  }
}
