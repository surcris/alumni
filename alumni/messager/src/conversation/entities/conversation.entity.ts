import { Document } from "mongoose";
import { MessageDto } from "src/chat-event/dto/message.dto";

export interface Conversation extends Document {
    
    userIdDest: string;
    userIdExpe: string;
    messages: MessageDto[];
    statut: string;
}
