import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema()
export class Conversation extends Document {
  
  @Prop({ required: true })
  userIdDest: string;

  @Prop({ required: true })
  userIdExpe: string;

  @Prop({ type: Array, default: [] })
  messages: [];
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);