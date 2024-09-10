/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './entities/user.type';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { cp } from 'fs';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTypeDto } from './dto/user-type.dto';
import { Roles } from './models/roles.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepository {
  private _users: Array<UserType> = [];

  
  constructor(@InjectRepository(UserEntity) private _repository: Repository<UserEntity>, private configService: ConfigService) {}

  findOne(login: string){
    const tab = this._repository.findOneBy({email:login})
    return tab;
  }

  findAll(role: Roles): Promise<Array<UserEntity>> {
    if (role===Roles.Admin) {
      return this._repository.find({select: {id: true, email: true, role: true} ,where:{role: Roles.Intern}})
    }
    return this._repository.find({select: {id: true, email: true, role: true}})
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
    const pepper = this.configService.get<string>('hash.pepper')
    const salt = await bcrypt.genSalt(11);
    const hash = await bcrypt.hash(password + pepper, salt);
    return this._repository.update({email:login}, {password:hash})

  }

  async validateUser(email: string, password: string): Promise<UserEntity | null> {
    const user = await this._repository.findOneBy({ email });
    Logger.log(JSON.stringify(user))
    const pepper = this.configService.get<string>('hash.pepper')
    const isMatch = await bcrypt.compare(password + pepper, user.password);

    if (isMatch) {
      return user; // Si l'email et le mot de passe correspondent, retourner l'utilisateur
    } else {
      return null; // Sinon, retourner null pour indiquer une échec d'authentification
    }
  }
}
