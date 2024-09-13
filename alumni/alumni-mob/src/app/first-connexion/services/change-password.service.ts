import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private readonly URI: string = `${environment.baseURL}:3000/user`

  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
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
