/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { UserType } from './user.type';

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
    /*
		if (this._client.send<UserType>(pattern, { payload })) {
			return of(true);
		}
		return of(false);
    */
   return this._client.send<boolean>(pattern, { payload })
	}

	// findOne(id: number) {
	// 	return `This action returns a #${id} user`;
	// }

	// update(id: number, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} user`;
	// }
}
