import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaggingDto {
  @ApiProperty({
    example: 1,
    description: 'номер страницы',
  })
  @Type(() => Number)
  readonly page: number = 1;

  @ApiProperty({
    example: 10,
    description: 'количество записей на странице',
  })
  @Type(() => Number)
  readonly limit: number = 10;
}
