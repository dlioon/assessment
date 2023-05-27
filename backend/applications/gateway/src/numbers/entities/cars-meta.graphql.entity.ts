import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CarsMeta {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  itemCount: number;

  @Field(() => Int)
  itemsPerPage: number;

  @Field(() => Int)
  totalPage: number;

  @Field(() => Int)
  currentPage: number;
}
