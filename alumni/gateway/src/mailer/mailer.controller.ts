import {
	Controller,
	Post,
	Body,
	Patch,
	Param,
	UnauthorizedException,
	Res,
	HttpStatus
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constante';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { take } from 'rxjs';

@Controller('mailer')
export class MailerController {
	constructor(
		private readonly mailerService: MailerService,
		private _jwtService: JwtService,
		private userService: UserService
	) {}

	@Post('send')
	async sendMail(@Body() body: any) {
		const { to, html } = body;
		return this.mailerService.sendMail(to);
	}
	@Patch('/recup/:token')
	async changePassword(
		@Param('token') tokenParam: string,
		@Body() body: any,
		@Res() resp: Response
	) {
		try {
			const verif = await this._jwtService.verifyAsync(tokenParam, {
				secret: jwtConstants.secret
			});
			const objectResponse = this.userService.changePassword({email:"toto@poe.aelion.fr",password:body.password,});
			return objectResponse.pipe(take(1)).subscribe({
				next: (response: any) => {
					if (response.status === 204) {
						resp.status(HttpStatus.NO_CONTENT).send();
					} else {
						resp.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
					}
				}
			});
		} catch {
			throw new UnauthorizedException();
		}

		// const { to, html } = body;
		// return this.mailerService.sendMail(to);
	}
}
