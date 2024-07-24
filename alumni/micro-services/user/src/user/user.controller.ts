/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserType } from './entities/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @MessagePattern({user: 'one'})
  // findOne(payload: any): UserType | null {
  //   return this.userService.findOne(payload.id);
  // }

  @MessagePattern({user: 'all'})
  findAll() {
    return this.userService.findAll()
  }


}
