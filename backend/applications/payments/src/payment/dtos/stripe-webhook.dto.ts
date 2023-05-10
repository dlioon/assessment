import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StripeWebhookDto {
  @ApiProperty()
  @IsNotEmpty()
  body: Buffer;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stripeSignature: string;
}
