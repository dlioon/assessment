import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
