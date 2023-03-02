import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindAllDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page: number;
}
