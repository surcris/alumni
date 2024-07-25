import { UserRepository } from './user.repository';
import { UserType } from './entities/user.type';
export declare class UserService {
    private _repository;
    constructor(_repository: UserRepository);
    findAll(): Promise<Array<UserType>>;
    findOne(login: string): Promise<boolean>;
}
