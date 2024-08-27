import { plainToClass } from "class-transformer";
import { InternDTO } from "../internDto/internDto"; 
 export class InternTransformer { static transform(intern: any): InternDTO { 
    return plainToClass(InternDTO, intern )} }