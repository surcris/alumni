import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  private readonly URI: string = `${environment.baseURL}:3000/mailer`
  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) { }

  public sendCode() {
    const email = "niel.abdallah@poe.aelion.fr"
    // const email = this._storage.retrieve('Email');
    console.log("Send")
    return this._httpClient.post<any>(this.URI + '/sendCode', { email })
    
    
  }

  public changePassword(email: string, password: string,token:string): Observable<HttpResponse<any>>{
    const payload = { 
      email: email,
      password: password
    };
    return this._httpClient.patch<HttpResponse<any>>(
      this.URI + '/recup/'+token,
      payload,
      {observe: 'response'}
    )
  }
}
