import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  priceUSD: number;

  @Field(() => [String])
  photos: string[];
}
