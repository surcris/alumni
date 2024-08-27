import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { InternSchema } from './schemas/intern.schema';
import { InternController } from './controllers/intern.controller';
import { InternService } from './services/intern.service';

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
    MongooseModule.forFeature([{ name: 'Intern', schema: InternSchema }]),
  ],
  controllers: [AppController, InternController],
  providers: [AppService, InternService],
})
export class AppModule {}
