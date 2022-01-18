import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocalGuard } from '@app/guards/local.guard';
import {
  RegistrationUserBodyDTO,
  LoginUserBodyDTO,
} from '@app/models/user.model';

import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201 })
  @Post('register')
  registerUser(@Body() user: RegistrationUserBodyDTO) {
    return this.authService.registerUser(user);
  }

  @ApiOperation({ summary: 'Логин' })
  @ApiResponse({ status: 201 })
  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginUserBodyDTO) {
    console.log(req.session);
    return req.session;
  }
}
