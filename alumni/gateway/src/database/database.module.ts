/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Poe } from 'src/poe/entities/poe.entity';
import { PostEntity } from 'src/post/models/post-entity';

@Module({
    imports: [ConfigModule, TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (_service: ConfigService): TypeOrmModuleOptions => ({
            type: _service.get<any>('database.type'),
            host: _service.get<string>('database.host'),
            port: _service.get<number>('database.port'),
            username: _service.get<string>('database.username'),
            password: _service.get<string>('database.password'),
            database: _service.get<string>('database.name'),
            synchronize: true,
            entities: [
              PostEntity,
              Poe
            ],
        })
    })],
})
export class DatabaseModule {}
