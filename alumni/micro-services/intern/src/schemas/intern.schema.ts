import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.schema';
import { Poe, PoeSchema } from './poe.schema';
import { Type } from 'class-transformer';

@Schema()
export class Intern {
  @Prop()
  lastname: string;
  @Prop()
  firstname: string;
  @Prop()
  gender: string;
  @Prop()
  emails: string[];
  @Prop()
  phoneNumber: string;
  @Prop()
  occupation?: string;
  @Prop({ type: CompanySchema })
  company: Company;
  @Prop({ type: PoeSchema })
  poe: Poe;
  @Prop()
  @Type(() => Number)
  userId: number;
}
export const InternSchema = SchemaFactory.createForClass(Intern);
