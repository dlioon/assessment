import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber({}, { each: true })
  numberIds: number[];
}
