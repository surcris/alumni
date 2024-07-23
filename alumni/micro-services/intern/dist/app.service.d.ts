import { InternType } from './models/intern.type';
import { InternRepository } from './intern-repository';
export declare class AppService {
    private _repository;
    constructor(_repository: InternRepository);
    findOne(id: number): InternType | null;
    findAll(): Array<InternType>;
}
