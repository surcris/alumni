/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user.type';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { cp } from 'fs';

@Injectable()
export class UserRepository {
  private _users: Array<UserType> = [];

  
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>) {}

  findOne(login: string){
    const tab = this._repository.findOneBy({email:login})
    return tab;
  }

  findAll(): Promise<Array<UserType>> {
    return this._repository.find()
  }

  createUserPassword(login: string, password: string) {
    return this._repository.update({email:login}, {password:password})
    
  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this._repository.findOneBy({ email });

    if (user && password === user.password) {
      return user; // Si l'email et le mot de passe correspondent, retourner l'utilisateur
    } else {
      return null; // Sinon, retourner null pour indiquer une échec d'authentification
    }
  }
}
