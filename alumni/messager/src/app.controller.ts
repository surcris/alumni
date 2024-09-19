import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';



@Controller()
export class AppController {
  // constructor(private readonly appService: AppService,private _chatService:ChatEventGateway) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Post("/socket/getMy")
  //   ifConnected(@Body() userId:any):Boolean{
      
  //     Logger.log("La")
  //     return this._chatService.userToSocket(userId.id) ? true : false;
  //   }

  // @Get("/socket/getAll")
  // getAllConnected(){
    
  //   Logger.log("All")
  //   const connectedUsers = this._chatService.getAllConnectedUsers();
  //   return this._chatService.usersToSocket()
  // }

  // @Get("/getAllMessage")
  // getAllMessage(){
    
  //   Logger.log("getAllMessage")
  //   const connectedUsers = this._chatService.getAllConnectedUsers();
  //   return this._chatService.usersToSocket()
  // }

  // @Post("/creatConv")
  // getCon(){
    
  //   const newConv: ConversationType = {
  //     userIdDest: "data.userDest",
  //     userIdExpe: "data.userExp",
  //     messages: "[newMessage]",
  //   };
  //   Logger.log("creatConv")
  //   const connectedUsers = this.appService.createConv(newConv);
  //   return connectedUsers
  // }

}
