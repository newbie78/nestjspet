import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { getFindList } from '../common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const created = await this.model.create(dto);
    return created;
  }

  async findAll(page = 1, limit = 10) {
    const queryObject = {};
    const querySort = { _id: -1 };
    const presenter = (el) => {
      const { _id: userId, name, email } = el;
      return {
        userId,
        name,
        email,
      };
    };

    const { list, count } = await getFindList(
      this.model,
      queryObject,
      querySort,
      presenter,
      limit,
      page,
    );

    return {
      list,
      count,
    };

    // return this.model.find().exec();
  }
}
