import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
