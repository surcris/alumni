import { Expose, Type } from 'class-transformer';
import { CompanyType } from '../types/company/company-type';
import { PoeType } from '../types/poe/poe-type';

export class InternTransfo {
    @Expose({name: '_id'})
    id?: number;
  
    @Expose()
    lastname?: string;
  
    @Expose()
    firstname?: string;
  
    @Expose()
    gender?: string;
  
    @Expose()
    emails?: string[];
  
    @Expose({name: 'phoneNumber'})
    phone?: string;
  
    @Expose()
    occupation?: string;
  
    @Expose()
    company?: CompanyType;
  
    @Expose()
    poe?: PoeType;
  }