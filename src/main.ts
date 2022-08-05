import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyLogger } from './logger/logger.service';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new MyLogger());

  const config = new DocumentBuilder()
    .setTitle('REST service')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('album')
    .addTag('artist')
    .addTag('favorites')
    .addTag('track')
    .addTag('user')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);

  // Event 'unhandledRejection'
  process.on('unhandledRejection', (error: Error) => {
    const logger = new MyLogger('unhandledRejection');
    logger.errorShow(error);
  });

  // Event 'uncaughtException'
  process.on('uncaughtException', (error: Error) => {
    const logger = new MyLogger('uncaughtException');
    logger.errorShow(error);
  });
}
bootstrap();
