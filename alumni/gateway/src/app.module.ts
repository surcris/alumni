import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { PostModule } from './post/post.module';
import { PoeModule } from './poe/poe.module';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/configuration.module';

@Module({
  imports: [
    InternModule,
    PostModule,
    PoeModule,
    DatabaseModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
