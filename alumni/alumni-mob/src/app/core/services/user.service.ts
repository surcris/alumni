import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
  private readonly URI: string = `${environment.baseURL}:3000/user`;

  constructor(private _httpClient: HttpClient) {}

  public getMyId(): Observable<any> {  // Create params object
    return this._httpClient.get<any>(this.URI +`/getId`)
    
  }
}
