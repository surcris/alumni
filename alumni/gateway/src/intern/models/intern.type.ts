import { CompanyType } from './company.type';
import { PoeType } from './poe.type';

export type InternType = {
	id?: number;
	lastname: string;
	firstname: string;
	gender: string;
	emails: Array<string>;
	phoneNumber: string;
	occupation?: string;
	company: CompanyType;
	poe: PoeType;
};
