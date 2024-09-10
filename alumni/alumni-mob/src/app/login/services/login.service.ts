import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private readonly URI: string = 'http://localhost:3000/user'

  constructor(private _httpClient: HttpClient) { }

  doLogin(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.login === 'stagiaire' && credentials.password === 'password') {
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

  public doAuth(credentials: any): Observable<any>{
    const payload = { 
      email: credentials.login,
      password: credentials.password
    };
    return this._httpClient.post<Observable<any>>(
      this.URI + '/auth',
      payload,
      { observe: 'response' }
    )
    // .pipe(
    //   map(response => {
    //     // On mappe la réponse complète pour extraire uniquement ce dont vous avez besoin
    //     return {
    //       status: response.status,     // Statut de la réponse (ex: 204)
    //       message: response.body  // Message dans le corps de la réponse (si présent)
    //     };
    //   })
    // );
  }
}
