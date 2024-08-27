import { InternType } from './models/intern.type';
export declare class AppService {
    private _interns;
    constructor();
    getHelloR(): string;
    findOne(id: number): InternType | null;
    private _populate;
}
