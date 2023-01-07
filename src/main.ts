import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/exceptions/all-exceptions.exception';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
  }))

  app.enableCors()
  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(3000);
}
bootstrap();
