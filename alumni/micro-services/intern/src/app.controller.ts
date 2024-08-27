import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InternType } from './models/intern.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'helloR' })
  getHelloR(): string {
    return this.appService.getHelloR();
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload() object: any): InternType {
    return this.appService.findOne(parseInt(object.id, 10));
  }
}
