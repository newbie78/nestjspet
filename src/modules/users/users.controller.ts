import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  HttpCode,
  HttpStatus,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User, CreateUserBodyDTO } from '@app/models/user.model';
import { PaggingDto } from '@app/common/dto/pagging.dto';

import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateUserBodyDTO) {
    const userToCreate = new User(dto);
    return await this.service.create(userToCreate);
  }

  @ApiOperation({ summary: 'Список пользователей' })
  @ApiResponse({ status: 200 })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async findAll(@Query() dto: PaggingDto) {
    try {
      const { page, limit } = dto;
      const { list, count } = await this.service.findAll(page, limit);
      return {
        list,
        pagination: { page, limit, count },
      };
    } catch (e) {
      throw new HttpException('Service Error', HttpStatus.BAD_REQUEST);
    }
  }
}
