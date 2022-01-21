import { HttpStatus } from '@nestjs/common';

import { Exception } from './base.exception';

export abstract class AuthenticationException extends Exception {
  public readonly type = HttpStatus.UNAUTHORIZED;
}

export abstract class NotAllowedException extends Exception {
  public readonly type = HttpStatus.FORBIDDEN;
}

export abstract class NotFoundException extends Exception {
  public readonly type = HttpStatus.NOT_FOUND;
}

export abstract class ClientException extends Exception {
  public readonly type = HttpStatus.BAD_REQUEST;
}

export abstract class ServerException extends Exception {
  public readonly type = HttpStatus.INTERNAL_SERVER_ERROR;
}
