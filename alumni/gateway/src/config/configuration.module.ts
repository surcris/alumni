/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [ConfigModule.forRoot({
        //envFilePath: `src/environments/${process.cwd()}/.config.yml`,
        load: [configuration]
    })]
})
export class ConfigurationModule {}
