import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Poe {
  @Prop()
  id?: number;
  @Prop()
  beginAt: Date;
  @Prop()
  endAt: Date;
  @Prop()
  name: string;
}
export const PoeSchema = SchemaFactory.createForClass(Poe);
