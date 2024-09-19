import { Document } from 'mongoose';
import { CompanyType } from 'src/models/company.type';
import { PoeType } from 'src/models/poe.type';
import { SkillsType } from 'src/models/skills.type';

export interface InterfaceIntern extends Document {
  readonly _id?: number;
  readonly lastname: string;
  readonly firstname: string;
  readonly gender: string;
  readonly emails: string[];
  readonly phoneNumber: string;
  readonly occupation?: string;
  readonly company: CompanyType;
  readonly poe: PoeType;
  readonly userId: number;
  readonly skills: SkillsType[];
}
