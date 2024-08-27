import { Expose } from 'class-transformer'; 
export class InternDTO { 
    @Expose()
    id!: number; 
    @Expose() 
    lastname!: string; 
    @Expose() 
    firstname!: string; 
    @Expose() 
    gender!: string; 
    @Expose() 
    emails!: string[]; 
    @Expose() 
    phoneNumber!: string; 
    @Expose() 
    occupation!: string; 
    @Expose() 
    company!: { 
        id: number; 
        name: string; }; 
    @Expose() 
    poe!: { 
        id: number; 
        name: string;
         beginAt: Date; 
         endAt: Date; 
        
        };
         }
