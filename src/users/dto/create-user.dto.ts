import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'емэйл пользователя',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'vasya777',
    description: 'никнейм пользователя',
  })
  @IsNotEmpty()
  readonly password: string;
}
