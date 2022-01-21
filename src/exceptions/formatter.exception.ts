import { HttpException } from '@nestjs/common';
import { Exception } from '@app/exceptions/base.exception';

export class Formatter {
  format(e: unknown): object {
    let statusCode = 0;
    let message = '';

    if (e instanceof HttpException) {
      statusCode = e.getStatus();
      message = e.message;
    } else if (e instanceof Exception) {
      statusCode = e.code;
      message = e.message;
    }

    return {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
