/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserType } from './entities/user.type';
import { response } from 'express';

@Injectable()
export class UserService {
  
  constructor(
    private _repository: UserRepository,
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
  async findOne(login: string){

    const userEntry = await this._repository.findOne(login);
    console.log("service" + JSON.stringify(userEntry))
    console.log(login)
    return userEntry ? true : false
  }

  async authUser(login: any){
    const userEntry = await this._repository.validateUser(login.email,login.mdp);
    if(userEntry)
      return {status: 204, message: 'OK', id: userEntry.id}   
    return {status: 400, message: 'Echec lors de l\'identification'}  
    
  }

  async createUserPassword(login: string, password: string){
    const updateObject = await this._repository.createUserPassword(login, password)
    if(updateObject.affected >0)
      return {status: 204, message: 'OK'}   
    return {status: 400, message: 'KO'}  
  }

  async getUserIdByEmail(email: any) {
    const userEntry = await this._repository.findOne(email);
    console.log("service Id" + JSON.stringify(userEntry.id))
    return userEntry.id
  }
}
