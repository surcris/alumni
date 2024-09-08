
import { Body, Controller, Get, HttpStatus, Logger, Param, Patch, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
import { Response } from 'express';

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
		Logger.log(info.email)
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
}
