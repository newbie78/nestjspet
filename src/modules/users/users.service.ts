import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getFindList } from '@app/common';
import { User, UserDocument } from '@app/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async create(dbo: User): Promise<User> {
    const record = await this.model.create(dbo);
    if (record) {
      return new User(record.toJSON());
    }
  }

  async findById(_id: number): Promise<User> {
    const record = await this.model.findOne({ _id }).exec();
    if (record) {
      return new User(record.toJSON());
    }
  }

  async findByEmail(email: string): Promise<User> {
    const record = await this.model.findOne({ email }).exec();
    if (record) {
      return new User(record.toJSON());
    }
  }

  async findAll(page = 1, limit = 10) {
    const queryObject = {};
    const querySort = { _id: -1 };
    const presenter = (el: User) => {
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
