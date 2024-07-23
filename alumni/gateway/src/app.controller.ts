import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET http://localhost:3000/api/v1
  getHello(): string {
    return this.appService.getHello();
  }
}
