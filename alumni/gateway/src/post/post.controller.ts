import {
	Body,
	Controller,
	Delete,
	FileTypeValidator,
	Get,
	Logger,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	Req,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { PostService } from './post.service';
import { take } from 'rxjs';
import { Response } from 'express';
import { PostType } from './models/post.type';
import { AuthGuard } from 'src/guards/auth.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';


@Controller(`post`)
export class PostController {

	private static readonly storage = multer.diskStorage({
		destination: function (req, file, cb) {
		  cb(null, path.join(process.cwd(),'uploads'))
		},
		filename: function (req, file, cb) {
		  const uniquePrefix = Date.now() + '-' + process.pid + '-' + Math.round(Math.random() * 1E9)
		  cb(null, uniquePrefix + path.extname(file.originalname)) //Appending extension
		}
	  })
	
	constructor(private _service: PostService,
		private readonly postService: PostService
	) { }

	@UseGuards(AuthGuard)
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

	@UseGuards(AuthGuard)
	@Post()
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: PostController.storage
		}),
	)
	add(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({ fileType: '.(png|jpeg|jpg|mp4)' }),
					
				],
				fileIsRequired: false,
			}
			)
		) 
			files: Array<Express.Multer.File>, @Body() post: PostType, @Req() req: Request, @Res() res: Response
		) {
		if (files)
			post.media = files[0].filename;
		post.author = req['user'].infoU.id
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

	@UseGuards(AuthGuard)
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

	@UseGuards(AuthGuard)
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
  @Get('author')
  findPostsByAuthor(@Req() req:Request,  @Res() res: Response) {
    this.postService.findPostsByAuthor(req['author'].id).subscribe({
      next: (posts: PostType[]) => {
        if (posts.length > 0) {
          res.status(200).json(posts);
        } else {
          res.status(404).json({ message: 'No posts found for this author.' });
        }
      },
      error: (error) => {
        res.status(500).json({ message: 'Error fetching posts.' });
      }
    });
  }
}
