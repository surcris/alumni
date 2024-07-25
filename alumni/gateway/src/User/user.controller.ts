/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
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
	@Get(':login')
	isValidEmailAelion(@Param('login') login: string): Observable<boolean> {
			return this.userService.isValidEmailAelion(login)
	}

	// 	@Get(':id')
	// 	findOne(@Param('id') id: string) {
	// 		return this.userService.findOne(+id);
	// 	}

	// 	@Patch(':id')
	// 	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 		return this.userService.update(+id, updateUserDto);
	// 	}

	// 	@Delete(':id')
	// 	remove(@Param('id') id: string) {
	// 		return this.userService.remove(+id);
	// 	}
}
