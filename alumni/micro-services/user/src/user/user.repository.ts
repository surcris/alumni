/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user.type';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { cp } from 'fs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTypeDto } from './dto/user-type.dto';

@Injectable()
export class UserRepository {
  private _users: Array<UserType> = [];

  
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>) {}

  findOne(login: string){
    const tab = this._repository.findOneBy({email:login})
    return tab;
  }

  findAll(): Promise<Array<UserEntity>> {
    return this._repository.find()
  }


  createUser(user: UserTypeDto) {
    return this._repository.insert(user)
  }

  updateUser(id: number, updateItem: UpdateUserDto) {
    return this._repository.update({id: id}, updateItem)
  }

  deleteUser(id: number){
    return this._repository.delete({id: id})
  }


  async createUserPassword(login: string, password: string) {
    
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return this._repository.update({email:login}, {password:hash})

  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this._repository.findOneBy({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user; // Si l'email et le mot de passe correspondent, retourner l'utilisateur
    } else {
      return null; // Sinon, retourner null pour indiquer une échec d'authentification
    }
  }
}
