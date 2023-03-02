import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ItemDto } from './item.dto';
import { PaymentStatus } from '../constants/payment.constants';

export class CreatePaymentDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  paymentId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items?: ItemDto[];
}
