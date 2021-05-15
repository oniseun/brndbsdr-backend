import { Field, Int, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';

@ObjectType()
export class Currency {
  @Field()
  success: boolean;

  @Field(() => Int)
  timestamp: number;

  @Field()
  base: string;

  @Field()
  date: string;

  @Field(() => JSON)
  rates: object;
}
