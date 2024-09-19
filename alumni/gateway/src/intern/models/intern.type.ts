import { PostType } from 'src/post/models/post.type';
import { CompanyType } from './company.type';
import { PoeType } from './poe.type';
import { SkillsType } from './skills.type';

export type InternType = {
	_id?: number;
	lastname: string;
	firstname: string;
	gender: string;
	emails: Array<string>;
	phoneNumber: string;
	occupation?: string;
	company: CompanyType;
	poe: PoeType;
	userId: number;
	skills: SkillsType;
	posts?: PostType[];
};
