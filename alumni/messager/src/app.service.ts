import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MessageDto } from './chat-event/dto/message.dto';
import { ConversationDto } from './chat-event/dto/conversation.dto';

@Injectable()
export class AppService  {
  // constructor(
  //   @InjectModel('Conversation')
  //   private conversationModel: Model<InterfaceConversation>,
  // ) {}
  // async createConv(c:ConversationType): Promise<InterfaceConversation>  {

  //   // const newMessage: MessageDto = {
  //   //   userId: data.userExp,
  //   //   content: data.message,
  //   //   datetime: new Date(),
  //   // };
  //   // // Logger.log('1:', newMessage);
  //   const newConv: ConversationType = {
  //     userIdDest: "data.userDest",
  //     userIdExpe: "data.userExp",
  //     messages: "[newMessage]",
  //   };
  //   Logger.log('2:', c);

  //   const conversation = new this.conversationModel(c)
    

  //   Logger.log('Conversation avant saved:', conversation);
  //   const savedConversation = await conversation.save();
  //   console.log('Conversation after saving:', savedConversation);

  //   return savedConversation;
  // }



  // getConv(userExpe: string, userDest: string): Promise<InterfaceConversation> {
  //   throw new Error('Method not implemented.');
  // }
  // findAll(): Promise<InterfaceConversation[]> {
  //   throw new Error('Method not implemented.');
  // }
  // findOne(userExpe: string, userDest: string): Promise<InterfaceConversation> {
  //   throw new Error('Method not implemented.');
  // }
  // addMessage(
  //   userExpe: string,
  //   userDest: string,
  //   message: string,
  // ): Promise<InterfaceConversation> {
  //   throw new Error('Method not implemented.');
  // }
  // deleteOne(userExpe: string, userDest: string): Promise<string> {
  //   throw new Error('Method not implemented.');
  // }
  // deleteAll(): Promise<string> {
  //   throw new Error('Method not implemented.');
  // }
  // getHello(): string {
  //   return 'Hello World!';
  // }

  // getAllMessage() {
  //   this.conversationModel;
  // }
}
