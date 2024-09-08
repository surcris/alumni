import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatEventGateway } from './chat-event/chat-event.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private _chatService:ChatEventGateway) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/socket/getMy")
    ifConnected(@Body() userId:any):Boolean{
      

      return this._chatService.userToSocket(userId.id) ? true : false;
    }
}
