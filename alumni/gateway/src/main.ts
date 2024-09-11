import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: ["http://localhost:8100", "http://localhost:8200"]});
	app.use(cookieParser());

	await app.listen(3000);
}
bootstrap();
