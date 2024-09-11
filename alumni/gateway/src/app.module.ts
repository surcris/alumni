import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { InternModule } from './intern/intern.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constante';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { MailerService } from './mailer/mailer.service';
import { ConfigModule } from '@nestjs/config';
jwtConstants

@Module({
	imports: [
		UserModule,
		PostModule,
		InternModule,
		MailerModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
	
}
