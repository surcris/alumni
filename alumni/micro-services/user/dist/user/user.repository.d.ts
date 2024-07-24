import { UserType } from './entities/user.type';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository {
    private _repository;
    private _users;
    constructor(_repository: Repository<UserEntity>);
    findAll(): Promise<Array<UserType>>;
}
