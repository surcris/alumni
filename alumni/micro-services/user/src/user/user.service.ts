/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserType } from './entities/user.type';

@Injectable()
export class UserService {
  constructor(
    private _repository: UserRepository
  ) {}
  
  //  create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }


  // findOne(id: number): UserType | null {
  //   return this._repository.findOne(id)
  // }

  findAll(): Promise<Array<UserType>> {
    return this._repository.findAll()
  }
}
