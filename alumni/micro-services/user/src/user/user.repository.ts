/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user.type';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UserRepository {
  private _users: Array<UserType> = [];

  
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>) {}

//   findOne(id: number): UserType {
//     return;
//   }

  findAll(): Promise<Array<UserType>> {
    return this._repository.find()
  }
}
