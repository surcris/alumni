import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import configuration from './configuration/configuration';




import { ConversationController } from './conversation/conversation.controller';
import { ConversationService } from './conversation/conversation.service';
import { ConversationSchema } from './messagerie/schemas/conversation.schema';
import { ChatEventGateway } from './chat-event/chat-event.gateway';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/configuration/env/${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri:
          configService.get<string>('MONGODB_URI') +
          ':' +
          configService.get<string>('MONGODB_PORT'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'Conversation', schema: ConversationSchema }]),
    
  ],
  controllers: [AppController,ConversationController],
  providers: [AppService,ChatEventGateway,ConversationService],
})
export class AppModule {}
