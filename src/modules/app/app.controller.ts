import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggedInGuard } from '@app/guards/logged-in.guard';
import { AdminGuard } from '@app/guards/admin.guard';

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
  @UseGuards(AdminGuard)
  @Get('admin')
  getAdminMessage() {
    return this.appService.getAdminMessage();
  }
}