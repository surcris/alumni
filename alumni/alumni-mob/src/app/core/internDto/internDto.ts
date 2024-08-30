import { Expose } from 'class-transformer'; 
import { CompanyType } from '../types/company/company-type';
import { PoeType } from '../types/poe/poe-type';
export class InternDTO { 
    @Expose({name: '_id'})
    id?: number;
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

}
