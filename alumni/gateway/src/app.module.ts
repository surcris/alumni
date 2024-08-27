import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { PostModule } from './post/post.module';
import { InternModule } from './intern/intern.module';

@Module({
	imports: [UserModule, PostModule, InternModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
