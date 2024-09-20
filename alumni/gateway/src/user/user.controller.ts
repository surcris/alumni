
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { map, Observable, OperatorFunction } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
import { Response } from 'express';
import * as expr from 'express';
import { UserTypeDto } from './dto/user-type.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';

@Controller('user')
export class UserController {
	constructor(private userService: UserService,
		private _jwtService: JwtService
	) {}


	@UseGuards(AdminGuard)
	@Get()
	findAll(@Request() req): Observable<Array<UserType>> {
		return this.userService.findAll(req.admin.infoU.role)
	}
	@Get('/log/:login')
	isValidEmailAelion(@Param('login') login: string): Observable<boolean> {
			return this.userService.isValidEmailAelion(login)
	}

  	@Get('set-cookie')
  	setCookie(@Res({ passthrough: true }) res: Response) {
    res.cookie('mySecureCookie', 'cookieValue', {
      httpOnly: true
    }).send('Cookie sécurisé défini avec succès');
  }

	@Post('/auth')
	async isValidEmailAndMdp(@Body() login: any, @Res() response: Response) {
		try {
			return this.userService.isValidEmailAndMdp(login.email, login.password)
			.pipe( 
			this.mapAuthUser(response)
			)
		  } catch (err) {
			return {
			  status: 500,
			  message: 'Une erreur est survenue lors de l\'authentification',
			  error: err
			};
		  }
	}

	@Post('/authAdmin')
	async authUserAdmin(@Body() login: any, @Res() response: Response) {
		try {
			  return this.userService.authUserAdmin(login.email, login.password)
			  .pipe( 
				this.mapAuthUser(response)
			  )
		  } catch (err) {
			return {
			  status: 500,
			  message: 'Une erreur est survenue lors de l\'authentification',
			  error: err
			};
		  }
	}

	@Get('/code')
	generateCode(): Observable<number> {
		return this.userService.generateRandomNumber(6)
	}

	@UseGuards(AuthGuard)
	@Get('/getId')
	async getMyId(@Body() info:any,@Req() request: expr.Request){
		const token = request.cookies["mySecureCookie"].refreshToken;  // Obtenez tous les cookies
    	
		const verif = await this._jwtService.verifyAsync(token, {
			secret: jwtConstants.secretRefresh
		});
		return verif.infoU.id
	}
	
	@Patch('/password')
	changePassword(@Body() payload: any, @Res() resp: Response) {

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


	/* The `@Post('/createUser')` decorator is defining a POST endpoint for creating a new user in the
	UserController class. The `createUser` method is responsible for handling the POST request and
	expects a request body containing user data in the format of `UserTypeDto`. The method then calls
	the `createUser` method of the `userService` instance to actually create the user based on the
	provided data. */
	@UseGuards(AdminGuard)
	@Post('/createUser')
	createUser(@Body() user:UserTypeDto){
		return this.userService.createUser(user)
	}

	/* The `@Patch('/updateUser')` decorator is defining a PATCH endpoint for updating an existing user in
	the UserController class. The `updateUser` method is responsible for handling the PATCH request and
	expects a request body containing user data in the format of `UserTypeDto`. */
	@UseGuards(AdminGuard)
	@Patch('/updateUser')
	updateUser(@Body() user:UserTypeDto) {
		return this.userService.updateUser(user)
	}

	/** The `@Delete('/deleteUser/:id')` decorator in the `UserController` class is defining a DELETE endpoint that
	expects an `id` parameter in the URL. When a DELETE request is made to this endpoint with a specific
	`id`, the `deleteUser` method is called with the `id` parameter extracted from the URL using the
	`@Param('id')` decorator. */
	@UseGuards(AdminGuard)
	@Delete('/deleteUser/:id')
	deleteUser(@Param('id') id: number) {
		return this.userService.deleteUser(id);
	}


	private mapAuthUser(response: Response): OperatorFunction<object, unknown>{
		return map(async (value: any) => {
			console.log("auth : ",value)
			if (value.status === 204) {
				const generatetoken = await this.userService.generateToken(value.payload);
				response.cookie('mySecureCookie', generatetoken, {
					httpOnly: true,
				  }).send({
					status: 204,
					message: 'OK',
					token: generatetoken
				});
				return;
			} else {
				response.status(401).send({
					status: 401,
					message: 'Email ou mot de passe incorrect',
					token: null
				});
				return;
			}
		});
	}
}
