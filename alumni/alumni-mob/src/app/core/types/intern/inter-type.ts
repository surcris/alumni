import { CompanyType } from "../company/company-type"
import { PoeType } from "../poe/poe-type"

export type InternType = {
  id?: string;
  lastname: string;
  firstname: string;
  gender: string;
  emails: Array<string>;
  phoneNumber: string;
  occupation?: string;
  company: CompanyType;
  poe: PoeType;
};