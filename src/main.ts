import * as helmet from 'helmet';
import * as compression from 'compression';
import rateLimit from 'express-rate-limit';

import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@app/modules/app/app.module';
import { RolesGuard } from '@app/guards/roles.guard';
import { GlobalExceptionsFilter } from '@app/exceptions/global-filter.exception';
import { Logger } from '@app/exceptions/logger.exception';
import { Formatter } from '@app/exceptions/formatter.exception';

async function bootstrap() {
  const test = '';
  console.log(test);
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));

  app.setGlobalPrefix(process.env.API_PREFIX, { exclude: ['/'] });
  app.useGlobalFilters(
    new GlobalExceptionsFilter(new Logger(), new Formatter()),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  const config = new DocumentBuilder()
    .setTitle('Nestjs Pet')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${process.env.API_PREFIX}/docs`, app, document);

  await app.listen(process.env.API_PORT);
}
bootstrap();
