import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { NumberStatus } from '../constants/number.constants';

export class UpdateNumberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  number: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NumberStatus)
  status: NumberStatus;
}
