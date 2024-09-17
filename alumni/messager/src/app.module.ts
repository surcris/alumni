import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatEventModule } from './chat-event/chat-event.module';
import { ChatEventGateway } from './chat-event/chat-event.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import configuration from './configuration/configuration';
import { UserConversationSchema } from './schemas/user-conversation';
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
    MongooseModule.forFeature([{ name: 'Message', schema: UserConversationSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService,ChatEventGateway],
})
export class AppModule {}
