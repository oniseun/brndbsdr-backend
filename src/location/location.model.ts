import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()

export class Location {
  @Field()
  ip: string;

  @Field()
  version: string;

  @Field()
  country: string;

  @Field()
  country_name: string;

  @Field()
  country_code: string;

  @Field()
  currency: string;

  @Field()
  currency_name: string;
}
