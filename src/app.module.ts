import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CurrencyModule } from './currency/currency.module';
import { LocationModule } from './location/location.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
const isDev = !['staging', 'production'].includes(process.env.NODE_ENV);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !isDev,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    CurrencyModule,
    LocationModule,
    ProductModule,
    GraphQLModule.forRoot({
      debug: isDev,
      playground: isDev,
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
