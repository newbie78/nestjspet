// import { APP_GUARD } from '@nestjs/core';
import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from 'redis';
import { MongooseModule } from '@nestjs/mongoose';

import { CovidModule } from '@app/modules/covid/covid.module';
import { UsersModule } from '@app/modules/users/users.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { RedisModule } from '@app/modules/redis/redis.module';
import { REDIS } from '@app/modules/redis/redis.constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    RedisModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    CovidModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: process.env.SESSION_SECRET,
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
