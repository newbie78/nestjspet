import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('По умолчанию')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Какой-то статически документ' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
