import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserType } from './user.type';

@Injectable()
export class UserService {
	// create(createUserDto: CreateUserDto) {
	// 	return 'This action adds a new user';
	// }

	constructor(@Inject('USER') private _client: ClientProxy) {}

	findAll(): Observable<Array<UserType>> {
		const pattern: any = { cmd: 'hello chai' };
		return this._client.send<UserType[]>(pattern, {});
	}
	isValidEmailAelion(login: string): Observable<Array<UserType>> {
		const pattern: any = { cmd: 'user' };
		const payload: string = login;
		return this._client.send<UserType[]>(pattern, payload);
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
