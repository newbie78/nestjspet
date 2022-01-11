import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX, { exclude: ['/'] });

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
