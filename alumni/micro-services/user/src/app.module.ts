/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

const envfile = "environments/" + process.env.NEST_ENV +"/.config.yml";
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>('TYPE') as any,
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        synchronize: true,
        entities: [UserEntity],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envfile],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
