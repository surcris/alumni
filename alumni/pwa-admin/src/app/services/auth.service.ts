import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // /!\ encapsulation with private  (for more security)!
  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    if(this.getToken()) {
      // check validity on backend or inside getToken
      this.loggedIn = true;
      // TODO: redirect ?
    }
  }

  login(email: string, password: string): void {
    this.http.post(`${environment.apiBaseUrl}/user/authAdmin`, { email, password } )
      .subscribe((responseBody: any) => {
        if(responseBody.hasOwnProperty('token')){
          this.loggedIn = true;
          this.storeToken(responseBody.token);
          this.router.navigateByUrl('/home');
        }
      })
  }

  private storeToken(token: string) {
    //  /!\ Cookies secure for more security
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token'); //recupère le token stocker dans le localstorage
  }

  removeToken(): void {
    localStorage.removeItem('token'); //supprime le token 
  }

  isLoggedIn(): any {
    this.loggedIn = false;
    this.removeToken();
    this.router.navigateByUrl('/login'); // vérification si l'admin est bien connecté en vérifiant la propriété 'loggedIn' et la présence du token dans le localstorage
  }
}