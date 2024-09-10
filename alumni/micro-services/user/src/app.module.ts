/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './config/configuration.module';

const envfile = 'environments/' + process.env.NEST_ENV + '/.config.yml';
@Module({
  imports: [
    UserModule,ConfigurationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<any>('database.type') as any,
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.db_username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db_name'),
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
export class AppModule {
  constructor() {
    Logger.log(process.env.NEST_ENV);
    const n: ConfigService  = new ConfigService();
     
     Logger.log(n.get<any>('database.db_name') );
  }
}
