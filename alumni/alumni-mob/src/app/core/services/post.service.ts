import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { PostTransfo } from '../transformers/post-transfo';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { CreatePostType } from '../types/post/post-type';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly URI: string = `${environment.baseURL}:3000/post`

  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) {}


  public addPost(formData: FormData): Observable<any> {
    
    return this._httpClient.post<any>(this.URI, formData)
  }
  
  
  public findAll(page: number): Observable<Array<PostTransfo>> {  // Create params object
    return this._httpClient.get<Array<PostTransfo>>(this.URI +`/${page}`).pipe(
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
    findPostsByAuthor(): Observable<Array<PostTransfo>> {
      return this._httpClient.get<Array<PostTransfo>>(this.URI +`/user/allPosts`).pipe(
        map(data => plainToInstance(PostTransfo, data))
      );
    }
}
