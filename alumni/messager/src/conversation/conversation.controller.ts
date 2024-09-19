import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ChatEventGateway } from 'src/chat-event/chat-event.gateway';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService,
    private _chatService:ChatEventGateway
  ) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationService.remove(+id);
  }

   @Post("/socket/getMy")
    ifConnected(@Body() userId:any):Boolean{
      
      Logger.log("La")
      return this._chatService.userToSocket(userId.id) ? true : false;
    }
}
