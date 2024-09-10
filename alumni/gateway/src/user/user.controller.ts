
import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { map, Observable } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
import { Response } from 'express';
import { UserTypeDto } from './dto/user-type.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}


	@UseGuards(AdminGuard)
	@Get()
	findAll(@Request() req): Observable<Array<UserType>> {
		return this.userService.findAll(req.admin.role)
	}
	@Get('/log/:login')
	isValidEmailAelion(@Param('login') login: string): Observable<boolean> {
			return this.userService.isValidEmailAelion(login)
	}

	@Post('/auth')
	async isValidEmailAndMdp(@Body() login: any,@Res() response: Response) {
		try {
			// Générez le token JWT avant de vérifier les identifiants

			// Utilisez une promesse pour attendre la réponse de l'observable
			
			//la valeur observable sert juste a conprendre le 
			  return this.userService.isValidEmailAndMdp(login.email, login.mdp)
			  .pipe(
				map(async (value:any) => {
					if (value.status === 204) {
						const generatetoken = await this.userService.generateToken(value.payload);
						// Si les identifiants sont valides, retournez une réponse avec le token
						Logger.log("Success")
						// resultat de l'observable 
						response.status(204).send ({
						  status: 204,
						  message: 'OK',
						  token: generatetoken // Retourne le token JWT généré
						});
						return ;
					  } else {
						Logger.log("err")
						response.status(401).send({
							status: 401,
							message: 'Email ou mot de passe incorrect',
							token:null
						  })
						// Si l'authentification échoue
						return ;
					  }
				})
			  )
		  } catch (err) {
			// Gérer les erreurs potentielles ici
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
}
