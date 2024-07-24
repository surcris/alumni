import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
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
