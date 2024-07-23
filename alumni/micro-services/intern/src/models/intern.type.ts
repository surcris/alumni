import { CompanyType } from './company.type';
import { PoeType } from './poe.type';

export type InternType = {
  id?: number;
  lastname: string;
  firstname: string;
  company: CompanyType;
  poe: PoeType;
  occupation?: string;
};
