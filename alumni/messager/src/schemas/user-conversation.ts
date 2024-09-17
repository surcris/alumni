import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop({ type: Date, default: Date.now })
  datetime: Date;

  @Prop()
  content: string;

  @Prop({ enum: ['in', 'out'] })
  direction: 'in' | 'out';
}

export class Conversation {
  @Prop()
  userId: string;

  @Prop({ type: [Message] })
  messages: Message[];
}

export class UserConversation {
    @Prop()
    userId: number
    @Prop({ type: [Conversation] })
    messages: Conversation[];
}
export const UserConversationSchema = SchemaFactory.createForClass(UserConversation);
