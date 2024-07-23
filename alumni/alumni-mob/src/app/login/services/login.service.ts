import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  doLogin(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.login === 'admin' && credentials.password === 'admin') {
      // Ici retourner un 200 ok
      return of(
        new HttpResponse<any>({
          status: 200,
          body: {token: 'a.b.c'}
        })
      )
    }

    // Retourner une réponse 403 Forbiden
    return of(
      new HttpResponse<any>({
        status: 403,
        body: {message: 'Echec de l\'identification'}
      })
    )
  }
}
