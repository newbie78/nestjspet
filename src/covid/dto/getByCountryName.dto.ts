import { ApiProperty } from '@nestjs/swagger';

export class getByCountryNameDto {
  @ApiProperty({
    example: 'ukraine',
    description: 'название страны в соотв со списком',
  })
  readonly country: string;
}
