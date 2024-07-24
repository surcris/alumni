import { UserService } from './user.service';
import { UserType } from './entities/user.type';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserType[]>;
}
