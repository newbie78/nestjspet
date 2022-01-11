import { Body, Controller, Get, Post } from '@nestjs/common';
import { CovidService } from './covid.service';
import { getByCountryNameDto } from './dto/getByCountryName.dto';

@Controller('covid')
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get('countries')
  countryList(): string[] {
    return this.covidService.countryList();
  }

  @Post()
  async getByCountryName(@Body() dto: getByCountryNameDto) {
    return this.covidService.getByCountryName(dto);
  }
}
