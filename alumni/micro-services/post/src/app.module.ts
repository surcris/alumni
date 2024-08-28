/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { PostModule } from './modules/post.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { validationSchema } from './configuration/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/configuration/env/${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<any>('TYPE'),
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USERDB'),
        password: configService.get<string>('PWDDB'),
        database: configService.get<string>('DB'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
