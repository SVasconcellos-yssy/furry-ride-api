import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';

const APP_NAME = 'API';

async function bootstrap() {
  const port = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(APP_NAME, {
      timestamp: true,
      logLevels: ['verbose', 'debug', 'log', 'warn', 'error'],
    }),
  });

  await app.listen(port);
}
bootstrap();
