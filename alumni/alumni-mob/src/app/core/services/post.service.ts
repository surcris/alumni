import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { PostTransfo } from '../transformers/post-transfo';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly URI: string = 'http://localhost:3000/post'

  private page: number;

  constructor(
    private _httpClient: HttpClient
  ) { 
    this.page = 0;
  }
  /**
   * Get the list of post
   * @returns Observable<PostType[]>
   */
  public findAll(): Observable<Array<PostTransfo>> {
    const params = { page: this.page };  // Create params object
    return this._httpClient.get<Array<PostTransfo>>(this.URI, { params }).pipe(
      map(data => plainToInstance(PostTransfo, data))
    );
  }

  /**
   * Get the list of sorted post by the most recent to the most old 
   * @returns PostType[]
   */
    public sortPost(listPosts: Array<PostTransfo>): Array<PostTransfo>{
      return listPosts.sort(function compare(a: PostTransfo, b: PostTransfo) {
        if (a.postedAt < b.postedAt)
           return 1;
        if (a.postedAt < b.postedAt)
           return -1;
        return 0;
      });
    }

}
