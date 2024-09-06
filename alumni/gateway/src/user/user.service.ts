
import { Inject, Injectable, Logger } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { UserType } from './user.type';
import { UserTypeDto } from './dto/user-type.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
	// create(createUserDto: CreateUserDto) {
	// 	return 'This action adds a new user';
	// }

	constructor(
		@Inject('USER') private _client: ClientProxy,
		private jwtService: JwtService) {}

	findAll(): Observable<Array<UserType>> {
		const pattern: any = { user: 'all' };
		return this._client.send<UserType[]>(pattern, {});
	}

	/**
	 * The `createUser` function sends a request to create a new user using the provided user data.
	 * @param {UserTypeDto} user - The `user` parameter in the `createUser` function is of type
	 * `UserTypeDto`, which likely contains information about the user being created, such as their name,
	 * email, and other relevant details.
	 * @returns The `createUser` function is returning the result of sending a request to the client with
	 * the `user` data.
	 */
	createUser(user: UserTypeDto) {
		const pattern: any = { user: 'createUser' };
		return this._client.send<any>(pattern, user);
	}

	/**
	 * The function updateUser takes an id and a partial user update object, sends a command to update the
	 * user, and returns the result.
	 * @param {number} id - The `id` parameter in the `updateUser` function is a number that represents the
	 * unique identifier of the user you want to update.
	 * @param {UpdateUserDto} updatePartialUser - The `updatePartialUser` parameter likely refers to a data
	 * transfer object (DTO) that contains the partial user information that needs to be updated. This
	 * object would typically include properties such as `name`, `email`, `password`, or any other fields
	 * that can be updated for a user.
	 * @returns The `updateUser` method is returning a Promise that resolves to an object when the
	 * `_client.send` method is called with the `pattern` and `payload` parameters.
	 */
	updateUser(updatePartialUser: UpdateUserDto){
		const pattern: any = { user: 'updateUser' };
		return this._client.send<object>(pattern, updatePartialUser);
	}

	/**
	 * The deleteUser function sends a request to delete a user with the specified id using a client.
	 * @param {number} id - The `id` parameter in the `deleteUser` function is a number that represents the
	 * unique identifier of the user that you want to delete from the system.
	 * @returns The `deleteUser` function is returning the result of sending a request to the client with
	 * the pattern `{ user: 'deleteUser' }` and the payload containing the `id` parameter. The return type
	 * is an object.
	 */
	deleteUser(id: number) {
		const pattern: any = { user: 'deleteUser' };
		const payload = { id };
		return this._client.send<object>(pattern, payload);
	}

	isValidEmailAelion(login: string): Observable<boolean> {
		const pattern: any = { user: 'user' };
		const payload: string = login;
		return this._client.send<boolean>(pattern, { payload });
	}


	isValidEmailAndMdp(email: string, mdp: string) {
		const pattern: any = { user: 'auth' };
		const payload: { email: string; mdp: string } = { email, mdp };
		return this._client.send<object>(pattern, { payload });
	}
	generateRandomNumber(length: number): Observable<number> {
		if (length <= 0) {
			throw new Error('Length must be greater than zero');
		}
		const digit = Math.floor(Math.random() * 10000);
		return of(digit);
	}

	getMyId(email: string):Observable<string>{
		const pattern: any = { cmd: 'getId' };
		const payload: { email: string } = { email };
		return this._client.send<string>(pattern, { payload });
	}

	changePassword(payload: object) {
		console.log('SERVICE: ' + JSON.stringify(payload));
		const pattern: any = { user: 'password' };
		return this._client.send<object>(pattern, payload);
	}

	async generateToken(email:string):Promise<any>{
		const payload = { email };

		return await this.jwtService.signAsync(payload)
	}

	// verifyToken(token:string){
	// 	this.jwtService.verify(token)
	// }
}
