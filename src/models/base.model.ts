import { Expose, instanceToPlain } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class BaseDBObject {
  @Expose()
  public get id() {
    return this._id ? this._id.toString() : undefined;
  }

  public _id?: ObjectId;

  constructor(partial = {}) {
    Object.assign(this, partial);
  }

  toJSON() {
    return instanceToPlain(this);
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
