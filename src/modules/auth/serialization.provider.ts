import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from '@app/modules/users/users.service';
import { User } from '@app/models/user.model';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }
  serializeUser(
    user: User,
    done: (err: Error, user: { id: any; role: string }) => void,
  ) {
    done(null, { id: user._id, role: user.role });
  }

  async deserializeUser(
    payload: { id: any; role: string },
    done: (err: Error, user: User) => void,
  ) {
    const user = await this.usersService.findById(payload.id);
    done(null, user);
  }
}
