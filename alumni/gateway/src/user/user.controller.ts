
import { Body, Controller, Get, HttpStatus, Logger, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { UserType } from './user.type';
import { take } from 'rxjs';
import { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth-guard/jwt-auth-guard';
import { AuthGuard } from '../guards/auth.guard';


@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	// @Post()
	// create(@Body() createUserDto: CreateUserDto) {
	// 	return this.userService.create(createUserDto);
	// }

	@UseGuards(AuthGuard)
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
	async isValidEmailAndMdp(@Body() login: any) {
		try {
			// Générez le token JWT avant de vérifier les identifiants
			const token = await this.userService.generateToken(login.email);
			
			// Utilisez une promesse pour attendre la réponse de l'observable
			const isValid = await new Promise((resolve, reject) => {
			  this.userService.isValidEmailAndMdp(login.email, login.mdp).subscribe({
				next: (value) => {
				  console.log('Valeur capturée:', JSON.stringify(value));
				  resolve(value);  // Renvoie la valeur si la validation réussit
				},
				error: (err) => {
				  console.error('Erreur:', err);
				  reject(err);  // Rejette la promesse en cas d'erreur
				},
				complete: () => {
				  console.log('Validation terminée');
				}
			  });
			});
		
			// Si les identifiants sont valides, retournez une réponse avec le token
			if (isValid) {
			  return {
				status: 204,
				message: 'OK',
				token: token // Retourne le token JWT généré
			  };
			} else {
			  // Si l'authentification échoue
			  return {
				status: 401,
				message: 'Email ou mot de passe incorrect'
			  };
			}
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
