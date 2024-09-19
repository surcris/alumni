/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserType } from './entities/user.type';
import { response } from 'express';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTypeDto } from './dto/user-type.dto';
import { Roles } from './models/roles.enum';

@Injectable()
export class UserService {
  
  constructor(
    private _repository: UserRepository,
  ) {}

  findAll(role: Roles): Promise<Array<UserEntity>> {
    return this._repository.findAll(role)
  }

  async findOne(login: string){
    const userEntry = await this._repository.findOne(login);
    console.log("service" + JSON.stringify(userEntry))
    console.log(login)
    return userEntry ? true : false
  }

  createUser(user: UserTypeDto) {
    return this._repository.createUser(user)
  }

  updateUser(id: number, updateItem: UpdateUserDto) {
    return this._repository.updateUser(id, updateItem)
  }

  deleteUser(id: number){
    return this._repository.deleteUser(id)
  }

  

  async authUser(login: any){
    const userEntry = await this._repository.validateUser(login.email,login.mdp);

    if(userEntry){
      
      return {status: 204, message: 'OK', payload:{id: userEntry.id,role:userEntry.role, email:userEntry.email}}  
    }else return {status: 400, message: 'Echec lors de l\'identification'}  
  }

  async authUserAdmin(login: any){
    const userEntry = await this._repository.validateUser(login.email,login.mdp);
  
    if(userEntry && userEntry.role != Roles.Intern){
      return {status: 204, message: 'OK', payload:{id: userEntry.id,role:userEntry.role, email:userEntry.email}}  
    }else return {status: 400, message: `Echec lors de l\'identification ou Vous n'avez pas les droits`}  
  }

  async createUserPassword(login: string, password: string){
   
    const updateObject = await this._repository.createUserPassword(login, password)
   
    if(updateObject.affected >0)
      return {status: 204, message: 'OK'}   
    return {status: 400, message: 'KO'}  
  }

  async getUserIdByEmail(email: any) {
    const userEntry = await this._repository.findOne(email);

    return userEntry.id
  }
}
