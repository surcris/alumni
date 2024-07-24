import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiveEmailService {

  private readonly URI: string = 'http://localhost:3000/user'

  constructor(
    private _httpClient: HttpClient
  ) { }

  /**
   * Get a boolean that show if an email is valid or not 
   * @returns Observable<Boolean>
   */
    public isValidateEmailAelion(email: string): Observable<Boolean>{
      return this._httpClient.get<Boolean>(
        this.URI + '/' + email
      )
    }
}
