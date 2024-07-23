/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { InternType } from './models/intern.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({intern: 'one'})
  findOne(payload: any): InternType | null {
    return this.appService.findOne(payload.id);
  }

  @MessagePattern({intern: 'all'})
  findAll() {
    return this.appService.findAll()
  }


}
