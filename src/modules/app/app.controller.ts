import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggedInGuard } from '@app/guards/logged-in.guard';
import { Roles, Role } from '@app/guards/roles.decorator';

import { AppService } from './app.service';

@ApiTags('По умолчанию')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Публичный роут' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getPublicMessage();
  }

  @ApiOperation({ summary: 'Только залогиненые пользователи' })
  @ApiResponse({ status: 200 })
  @UseGuards(LoggedInGuard)
  @Get('protected')
  guardedRoute() {
    return this.appService.getPrivateMessage();
  }

  @ApiOperation({ summary: 'Пользователи с ролью - admin' })
  @ApiResponse({ status: 200 })
  @Roles(Role.Admin)
  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage();
  }

  @ApiOperation({ summary: 'Пользователи с ролью - admin и user' })
  @ApiResponse({ status: 200 })
  @Roles(Role.Admin, Role.User)
  @Get('mixed')
  getMixedMessage() {
    return this.appService.getAdminMessage();
  }
}
