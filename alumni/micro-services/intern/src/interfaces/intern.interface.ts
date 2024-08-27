import { Document } from 'mongoose';
import { CompanyType } from 'src/models/company.type';
import { PoeType } from 'src/models/poe.type';

export interface InterfaceIntern extends Document {
  readonly id?: number;
  readonly lastname: string;
  readonly firstname: string;
  readonly gender: string;
  readonly emails: string[];
  readonly phoneNumber: string;
  readonly occupation?: string;
  readonly company: CompanyType;
  readonly poe: PoeType;
}
