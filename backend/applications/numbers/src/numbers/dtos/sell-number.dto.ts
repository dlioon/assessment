import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class SellNumberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  paymentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  numberIds: number[];
}
