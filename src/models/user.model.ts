import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { BaseDBObject } from './base.model';

@Schema()
@Exclude()
export class User extends BaseDBObject {
  @Expose()
  @Prop()
  name: string;

  @Expose()
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Expose()
  @Prop()
  role: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

export class RegistrationUserBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class CreateUserBodyDTO {
  @ApiProperty({
    example: 'vasya777',
    description: 'никнейм пользователя',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'емэйл пользователя',
  })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class LoginUserBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
