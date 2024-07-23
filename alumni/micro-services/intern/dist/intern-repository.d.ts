import { InternType } from "./models/intern.type";
export declare class InternRepository {
    private _interns;
    constructor();
    findAll(): Array<InternType>;
    findOne(id: number): InternType | null;
    add(intern: InternType): InternType;
    delete(id: number): void;
    update(intern: InternType): void;
    private _populate;
}
