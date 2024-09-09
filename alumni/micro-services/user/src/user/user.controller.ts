/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Res,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserTypeDto } from './dto/user-type.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @MessagePattern({ user: 'all' })
  findAll() {
    return this._userService.findAll();
  }
  
  @MessagePattern({ user: 'user' })
  findOne(@Payload() payload: any) {
    return this._userService.findOne(payload.payload);
  }

  @MessagePattern({ user: 'createUser' })
  createUser(@Payload() payload: UserTypeDto) {
    return this._userService.createUser(plainToInstance(UserTypeDto, payload))
  }

  @MessagePattern({ user: 'updateUser' })
  updateUser(@Payload() payload: any) {
    return this._userService.updateUser(payload.id, payload)
  }

  @MessagePattern({ user: 'deleteUser' })
  deleteUser(@Payload() payload: any){
    return this._userService.deleteUser(payload.id)
  }

  @MessagePattern({ user: 'auth' })
  authUser(@Payload() payload: any) {
    Logger.log(JSON.stringify(payload))
    return this._userService.authUser(payload.payload);
  }

  @MessagePattern({ user: 'password' })
  createUserPassword(@Payload() receivedpayload: any) {
    console.log('payloadms: ' + JSON.stringify(receivedpayload));
    return this._userService.createUserPassword(
      receivedpayload.email,
      receivedpayload.password,
    );
  }

  @MessagePattern({ cmd: 'getId' })
  getUserIdByEmail(@Payload() receivedpayload: any) {
    console.log('payload Id : ' + JSON.stringify(receivedpayload));
    return this._userService.getUserIdByEmail(
      receivedpayload.email
    );
  }
}
