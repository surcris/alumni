import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class UserService {
  private readonly URI: string = 'http://localhost:3000/user';

  constructor(private _httpClient: HttpClient) {}

  public getMyId(): Observable<any> {  // Create params object
    return this._httpClient.get<any>(this.URI +`/getId`)
    
  }
}
