import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('CarFindAll')
export class CarFindAllInput {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  readonly limit?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  readonly page?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly text?: string;
}
