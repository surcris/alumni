import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Skills {
  @Prop()
  id?: number;
  @Prop()
  name: string;
  @Prop()
  level: number;
  @Prop()
  endorsements: number;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
