import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { InternModule } from './intern/intern.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constante';
import { UserModule } from './user/user.module';
jwtConstants

@Module({
	imports: [
		UserModule,
		PostModule,
		InternModule,
		
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
	
}
