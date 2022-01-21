import { Module } from '@nestjs/common';

import { CovidController } from './covid.controller';
import { CovidService } from './covid.service';

@Module({
  controllers: [CovidController],
  providers: [CovidService],
  exports: [CovidService],
})
export class CovidModule {}
