import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ENV } from './config/env.config'
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.enableCors({ credentials: true, origin: ["http://localhost:8100", "http://localhost:8200"]});
  await app.listen(ENV.PORT)
}
bootstrap()
