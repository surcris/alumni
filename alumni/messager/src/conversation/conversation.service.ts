import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  async create(dataReceive: any) {
    const newConversation = await this.conversationModel.findOne({
      $or:[
        // recherche A&B ou B&A
        {userIdDest: dataReceive.userDest,userIdExpe: dataReceive.userExp},
        {userIdDest: dataReceive.userExp,userIdExpe: dataReceive.userDest}
      ]
    });
    // Logger.log("Test Create oui: ")
    
    if (newConversation) {
      Logger.log("Test Create oui: ")
      return this.update(dataReceive)

    }else{
      Logger.log("Test Create non: ")
      const newMessage: MessageDto = {
        userId: dataReceive.userExp,
        content: dataReceive.message,
        datetime: new Date(),
        statut: "non lu"
      };
  
      const newConversation = await this.conversationModel.create({
        userIdDest: dataReceive.userDest,
        userIdExpe: dataReceive.userExp,
        messages: [newMessage],
      });
      return newConversation;
    }
    
  }

  async findAll() {
    const newConversation = await this.conversationModel.find()
    if (!newConversation || newConversation.length == 0) {
      throw new NotFoundException('Conversation data not found!');
    }
    return newConversation;
  }

  async findOne(dataReceive: any) {
    const newConversation = await this.conversationModel.findOne({
      $or:[
        // recherche A&B ou B&A
        {userIdDest: dataReceive.userDest,userIdExpe: dataReceive.userExp},
        {userIdDest: dataReceive.userExp,userIdExpe: dataReceive.userDest}
      ]
    });
    
    return newConversation
  }

  async update(dataReceive: any) {
    // Logger.log("Test find Upd 1 : ",dataReceive)
    try {
      
      const findConversation = await this.conversationModel.findOne({
        $or:[
          // recherche A&B ou B&A
          {userIdDest: dataReceive.userDest,userIdExpe: dataReceive.userExp},
          {userIdDest: dataReceive.userExp,userIdExpe: dataReceive.userDest}
        ]
      });

      
      // Logger.log("Test find Upd 2: ",findConversation)
      if (findConversation) {


        const newMessage: MessageDto = {
          userId: dataReceive.userExp,
          content: dataReceive.message,
          datetime: new Date(),
          statut: "non lu"
        };
        findConversation.messages.push(newMessage)

        // Logger.log(" Affiche 1 : ", findConversation);
        const updateConversation = await this.conversationModel.findByIdAndUpdate(
          findConversation.id,
          findConversation
        );
        
        // Logger.log(" Affiche 2 : ", updateConversation);
      
        return updateConversation;
      }else{
        Logger.log("Conversation non trouvée.");
        return { message: 'Conversation non trouvée' };
      }
      
      
    } catch (error) {
      Logger.error("Erreur lors de la mise à jour de la conversation : ", error);
      return { message: 'Erreur lors de la mise à jour de la conversation', error };
    }
    
  }
  async updateStatut(dataReceive: any) {
    // Logger.log("Test find Upd 1 : ",dataReceive)
    try {
      
      const findConversation = await this.conversationModel.findOne({
        $or:[
          // recherche A&B ou B&A
          {userIdDest: dataReceive.userDest,userIdExpe: dataReceive.userExp},
          {userIdDest: dataReceive.userExp,userIdExpe: dataReceive.userDest}
        ]
      });

      
      // Logger.log("Test find Upd 2: ",findConversation)
      if (findConversation) {


        findConversation.messages[dataReceive.index].statut = "lu"

        // Logger.log(" Affiche 1 : ", findConversation);
        const updateConversation = await this.conversationModel.findByIdAndUpdate(
          findConversation.id,
          findConversation
        );
        
        // Logger.log(" Affiche 2 : ", updateConversation);
      
        return updateConversation;
      }else{
        Logger.log("Conversation non trouvée.");
        return { message: 'Conversation non trouvée' };
      }
      
      
    } catch (error) {
      Logger.error("Erreur lors de la mise à jour de la conversation : ", error);
      return { message: 'Erreur lors de la mise à jour de la conversation', error };
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
