import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatEventModule } from './chat-event/chat-event.module';
import { ChatEventGateway } from './chat-event/chat-event.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,ChatEventGateway],
})
export class AppModule {}
