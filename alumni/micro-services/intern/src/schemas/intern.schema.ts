import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.schema';
import { Poe, PoeSchema } from './poe.schema';

@Schema()
export class Intern {
  @Prop()
  id?: number;
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
}
export const InternSchema = SchemaFactory.createForClass(Intern);
