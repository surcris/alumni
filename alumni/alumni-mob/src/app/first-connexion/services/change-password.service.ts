import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private readonly URI: string = 'http://localhost:3000/user'

  constructor(
    private _httpClient: HttpClient
  ) { }

  /**
   * Get a statut that show if the password has changed correctly or not 
   * @returns Observable<HttpResponse<any>>
   */
    public changePassword(email: string, password: string): Observable<HttpResponse<any>>{
      const payload = { 
        email: email,
        password: password
      };
      return this._httpClient.patch<HttpResponse<any>>(
        this.URI + '/password',
        payload,
        {observe: 'response'}
      )
    }

}
