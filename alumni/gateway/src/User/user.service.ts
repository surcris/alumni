/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { UserType } from './user.type';
import { Response } from 'express';

@Injectable()
export class UserService {
	// create(createUserDto: CreateUserDto) {
	// 	return 'This action adds a new user';
	// }

	constructor(@Inject('USER') private _client: ClientProxy) {}

	findAll(): Observable<Array<UserType>> {
		const pattern: any = { user: 'all' };
		return this._client.send<UserType[]>(pattern, {});
	}
	isValidEmailAelion(login: string): Observable<boolean> {
		const pattern: any = { cmd: 'user' };
		const payload: string = login;
		console.log('test: ' + login);

   return this._client.send<boolean>(pattern, { payload })
	}

	generateRandomNumber(length: number): Observable<number> {
		if (length <= 0) {
		  throw new Error('Length must be greater than zero');
		}
		const digit = Math.floor(Math.random() * 10000);
		return of(digit);
	}

	changePassword(payload: object){
		console.log('SERVICE: '+JSON.stringify(payload))
		const pattern: any = {cmd: 'password'}
		return this._client.send<Response>(pattern, payload)
	}
	
}
