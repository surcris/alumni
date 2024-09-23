import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common';
import { InternType } from './models/intern.type';
import { InternService } from './intern.service';
import { take } from 'rxjs';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateInternDto } from './update.intern.dto';

@Controller('intern')
export class InternController {
	constructor(private _service: InternService) {}

	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request, @Res() res: Response) {
		this._service
			.findAll(req['user'].infoU.id)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			}); //une autre façon de désouscrire
	}

	@UseGuards(AuthGuard)
	@Get('findOne/:id')
	findOne(@Param('id') id: string, @Res() res: Response) {
		this._service
			.findOne(id)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}

	@Get('findOneByEmail/:email')
	findOneByEmail(@Param('email') email: string, @Res() res: Response) {
		
		this._service
			.findOneByEmail(email)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}

	@Post()
	add(@Body() intern: InternType, @Res() res: Response) {
		this._service
			.add(intern)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}

	@UseGuards(AuthGuard)
	@Patch()
	update(@Body() updateObject: any, @Res() res: Response) {
		this._service
			.update(updateObject)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					
					if (response) {
						res.status(200).send(true);
					} else {
						res.status(404).send(false);
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}
	// @UseGuards(AdminGuard)
	@Delete(':id')
	delete(@Param('id') id: string, @Res() res: Response) {
		this._service
			.delete(id)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}



	@UseGuards(AuthGuard)
	@Get('profile')
	getProfileData(@Req() req:Request, @Res() res: Response) {
		this._service
			.getProfileData(req['user'].infoU.id)
			.pipe(take(1))
			.subscribe({
				next: (response: any) => {
					if (response) {
						res.status(200).send(response);
					} else {
						res.status(404).send();
					}
				},
				error: (error: any) => {
					res.status(500).send(error);
				}
			});
	}
}
