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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaggingDto } from '../common/dto/pagging.dto';
// import { User } from './schemas/user.schema';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.service.create(dto);
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
