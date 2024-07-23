import { AppService } from './app.service';
import { InternType } from './models/intern.type';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findOne(payload: any): InternType | null;
    findAll(): InternType[];
}
