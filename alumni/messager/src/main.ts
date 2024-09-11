import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ENV } from './config/env.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: ["http://localhost:8100", "http://localhost:8200"]});
  await app.listen(ENV.PORT)
}
bootstrap()
