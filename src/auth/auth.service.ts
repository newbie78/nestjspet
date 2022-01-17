import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { UsersService } from '../users/users.service';
import {
  User,
  RegistrationUserBodyDTO,
  LoginUserBodyDTO,
} from '../models/user.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(user: LoginUserBodyDTO) {
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!user || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const { password: _password, ...retUser } = foundUser;
    return retUser;
  }

  async registerUser(
    user: RegistrationUserBodyDTO,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User remail must be unique');
    }
    if (user.password !== user.passwordConfirm) {
      throw new BadRequestException(
        'Password and Confirmation Password must match',
      );
    }
    user.password = await hash(user.password, 12);
    const userToCreate = new User(user);
    return this.usersService.create(userToCreate);
  }
}
