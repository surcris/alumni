import { Injectable, Logger } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './entities/conversation.entity';
import { Model } from 'mongoose';
import { MessageDto } from 'src/chat-event/dto/message.dto';

@Injectable()
export class ConversationService {
  constructor(@InjectModel('Conversation') private conversationModel: Model<Conversation>){

  }
  async create(createConversationDto: CreateConversationDto) {

    const newMessage: MessageDto = {
      userId: "userExp",
      content: "messageContent",
      datetime: new Date(),
    };

    const newConversation = await this.conversationModel.create({
      userIdDest: "userDest",
      userIdExpe: "userExp",
      messages: [newMessage],
    });

    Logger.log("Test : ",newConversation)
    return await newConversation;
  }

  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
