import { Expose } from 'class-transformer'; 
import { CompanyType } from '../types/company/company-type';
import { PoeType } from '../types/poe/poe-type';
import { SkillsType } from '../types/skills/skillType';
export class InternDTO { 
    @Expose({name: '_id'})
    id?: string;
    @Expose() 
    lastname!: string; 
    @Expose() 
    firstname!: string; 
    @Expose() 
    gender?: string; 
    @Expose() 
    emails?: string[]; 
    @Expose() 
    phoneNumber?: string; 
    @Expose() 
    occupation?: string; 
    @Expose()
    company?: CompanyType;
    @Expose()
    poe?: PoeType;
    @Expose()
    userId?: number;
    @Expose()
    skills?: SkillsType[];

}
