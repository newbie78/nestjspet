import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'static page';
  }

  getPublicMessage(): string {
    return 'This message is public to all!';
  }

  getPrivateMessage(): string {
    return 'You can only see this if you are authenticated';
  }

  getAdminMessage(): string {
    return 'You can only see this if you are an admin';
  }
}
