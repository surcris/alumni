import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PostType } from './models/post.type';

@Injectable()
export class PostService {
	constructor(@Inject('POST') private _client: ClientProxy) {}

	findAll(page: number): Observable<Array<PostType>> {
		const pattern = { cmd: 'findAll' };
		return this._client.send<PostType[]>(pattern, { page });
	}

	findOne(id: string): Observable<PostType> {
		const pattern = { cmd: 'findOne' };
		return this._client.send<PostType>(pattern, { id });
	}

	add(post: PostType): Observable<PostType> {
		const pattern = { cmd: 'add' };
		return this._client.send<PostType>(pattern, post);
	}

	update(payload: any): Observable<string> {
		const pattern = { cmd: 'update' };
		return this._client.send<string>(pattern, payload);
	}

	delete(id: string): Observable<string> {
		const pattern = { cmd: 'delete' };
		return this._client.send<string>(pattern, { id });
	}
	findPostsByAuthor(authorId: string): Observable<Array<PostType>> {
		const pattern = { cmd: 'findPostsByAuthor' };
		return this._client.send<PostType[]>(pattern, { authorId });
	  }
}
