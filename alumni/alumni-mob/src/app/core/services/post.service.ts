import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostType } from '../types/post/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly URI: string = 'http://localhost:3000/post'

  constructor(
    private _httpClient: HttpClient
  ) { }

  findAll(): Observable<Array<PostType>> {
    return this._httpClient.get<Array<PostType>>(this.URI)
      .pipe(
        map((posts: Array<any>) => { // Transform an observable to another observable
          return posts.map((post: any) => {
            // return { ... post, postedAt: new Date(post.postedAt), author.poe.beginAt: new Date(post.author.poe.beginAt), author.poe.endAt: new Date(post.author.poe.endAt)}
            return { // Deserialization
              id: post.id,
              title: post.title,
              content: post.content,
              postedAt: new Date(post.postedAt),
              media: post.media,
              author: {
                id: post.author.id,
                lastname: post.author.lastname,
                firstname: post.author.firstname,
                occupation: post.author.occupation,
                company: {
                  id: post.author.company.id,
                  name: post.author.company.name
                },
                poe: {
                  id: post.author.poe.id,
                  name: post.author.poe.name,
                  beginAt: new Date(post.author.poe.beginAt),
                  endAt: new Date(post.author.poe.endAt)
                }
              }
            }
          }) // Transform an array to another array
        })
      )
  }
}
