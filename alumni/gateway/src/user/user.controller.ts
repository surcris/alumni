
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
import { Response } from 'express';
import { UserTypeDto } from './dto/user-type.dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	// @Post()
	// create(@Body() createUserDto: CreateUserDto) {
	// 	return this.userService.create(createUserDto);
	// }

	@Get()
	findAll(): Observable<Array<UserType>> {
		return this.userService.findAll().pipe(
			take(1) // Autre façon d'arrêter d'observer
		);
	}
	@Get('/log/:login')
	isValidEmailAelion(@Param('login') login: string): Observable<boolean> {
			return this.userService.isValidEmailAelion(login)
	}

	@Post('/auth/')
	isValidEmailAndMdp(@Body() login: any) {
			return this.userService.isValidEmailAndMdp(login.email,login.mdp)
	}

	@Get('/code')
	generateCode(): Observable<number> {
		return this.userService.generateRandomNumber(6)
	}

	@Post('/getId')
	getMyId(@Body() info:any): Observable<string>{
		// Logger.log(info.email)
		return this.userService.getMyId(info.email)
	}

	@Patch('/password')
	changePassword(@Body() payload: any, @Res() resp: Response) {
		console.log(JSON.stringify(payload))
		const objectResponse = this.userService.changePassword(payload)
		objectResponse.
		pipe(
			take(1)
		)
		.subscribe({
			next: (response : any) => {
				if (response.status === 204){
					resp.status(HttpStatus.NO_CONTENT).send()
				}else{
					resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
				}
			}
		})
	}


	// 	@Delete(':id')
	// 	remove(@Param('id') id: string) {
	// 		return this.userService.remove(+id);
	// 	}

	/* The `@Post('/createUser')` decorator is defining a POST endpoint for creating a new user in the
	UserController class. The `createUser` method is responsible for handling the POST request and
	expects a request body containing user data in the format of `UserTypeDto`. The method then calls
	the `createUser` method of the `userService` instance to actually create the user based on the
	provided data. */
	@Post('/createUser')
	createUser(@Body() user:UserTypeDto){
		return this.userService.createUser(user)
	}

	/* The `@Patch('/updateUser')` decorator is defining a PATCH endpoint for updating an existing user in
	the UserController class. The `updateUser` method is responsible for handling the PATCH request and
	expects a request body containing user data in the format of `UserTypeDto`. */
	@Patch('/updateUser')
	updateUser(@Body() user:UserTypeDto) {
		return this.userService.updateUser(user)
	}

	/* The `@Delete('/deleteUser/:id')` decorator in the `UserController` class is defining a DELETE endpoint that
	expects an `id` parameter in the URL. When a DELETE request is made to this endpoint with a specific
	`id`, the `deleteUser` method is called with the `id` parameter extracted from the URL using the
	`@Param('id')` decorator. */
	@Delete('/deleteUser/:id')
	deleteUser(@Param('id') id: number) {
		return this.userService.deleteUser(id);
	}




}
