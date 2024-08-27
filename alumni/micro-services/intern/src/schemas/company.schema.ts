import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Company {
  @Prop()
  id?: number;
  @Prop()
  name: string;
}
export const CompanySchema = SchemaFactory.createForClass(Company);
