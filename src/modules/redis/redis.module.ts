import { Module } from '@nestjs/common';
import * as Redis from 'redis';
import { ConfigModule } from '@nestjs/config';

import { REDIS } from './redis.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
      }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
