import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Exception } from '@app/exceptions/base.exception';
import { Logger } from '@app/exceptions/logger.exception';
import { Formatter } from '@app/exceptions/formatter.exception';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger,
    private readonly formatter: Formatter,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    // const request = context.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
    } else if (exception instanceof Exception) {
      status = exception.type;
    }

    const payload = this.formatter?.format(exception) || 'NO FORMATTER';

    if (host.getType() === 'http') {
      response.status(status).send(payload);
    }

    // для ws и rpc будут другие ответы с пайлодом
  }
}
