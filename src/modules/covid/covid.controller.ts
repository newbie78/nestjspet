import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CovidService } from './covid.service';
import { getByCountryNameDto } from './dto/getByCountryName.dto';
import { Roles, Role } from '@app/guards/roles.decorator';

@ApiTags('Covid-19')
@Roles(Role.Admin, Role.User)
@Controller('covid')
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @ApiOperation({ summary: 'Список поддерживаемых стран' })
  @ApiResponse({ status: 200 })
  @Get('countries')
  countryList(): string[] {
    return this.covidService.countryList();
  }

  @ApiOperation({ summary: 'Текстовая инофрмация по стране' })
  @ApiResponse({ status: 200 })
  @Post()
  async getByCountryName(@Body() dto: getByCountryNameDto) {
    return this.covidService.getByCountryName(dto);
  }
}
