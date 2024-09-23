import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({ credentials: true, origin: ["http://localhost:8100","http://localhost:8101", "http://127.0.0.1:8100", "http://1270.0.0.1:8200", "http://localhost:8200", "http://10.205.31.151", "http://10.205.99.52"]});
	// app.enableCors({ credentials: true, origin: '*'});
	app.use(cookieParser());
	app.use('/uploads', express.static(join(process.cwd(), 'uploads')));  

	await app.listen(3000);
}
bootstrap();
