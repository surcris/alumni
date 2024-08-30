import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common';
import { PostService } from './post.service';
import { take } from 'rxjs';
import { Response } from 'express';
import { PostType } from './models/post.type';

@Controller(`post`)
export class PostController {
	constructor(private _service: PostService) {}

	@Get(':page')
	findAll(@Param('page') page: number, @Res() res: Response) {
		this._service
			.findAll(page)
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

	@Post()
	add(@Body() post: PostType, @Res() res: Response) {
		this._service
			.add(post)
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

	@Patch()
	update(@Body() updateObject: any, @Res() res: Response) {
		this._service
			.update(updateObject)
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
}
