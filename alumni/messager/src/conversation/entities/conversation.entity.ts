import { Document } from "mongoose";

export interface Conversation extends Document {
    
    userIdDest: string;
    userIdExpe: string;
    messages: [];
}
