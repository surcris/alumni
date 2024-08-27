import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3100,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        Logger.log(errors);
      },
      skipNullProperties: true,
      skipMissingProperties: true,
      skipUndefinedProperties: true,
    }),
  );
  await app.listen();
  // const app = await NestFactory.create(AppModule);
  // app.enableCors();
  // await app.listen(3000);
}
bootstrap();
