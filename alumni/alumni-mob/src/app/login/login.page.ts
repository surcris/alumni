import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credentials = { login: '', password: '' };
  private desiredUrl = ''
  constructor(
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService, // Accède à l'URL de redirection
    private route: ActivatedRoute
  ) {}

  onLogin() {
    this.loginService.doLogin(this.credentials).subscribe(response => {
      if (response.status === 200) {
        localStorage.setItem('token', response.body.token);
        this.desiredUrl = this.route.snapshot.queryParams['desiredUrl'];
     
     
          if (this.desiredUrl){
            this.router.navigateByUrl(this.desiredUrl);
          }
          this.router.navigateByUrl('tabs/tab1');

        // Vérifie s'il y a une URL de redirection sauvegardée
        const redirectUrl = this.storageService.retrieve('redirectUrl') || '/';
        this.storageService.remove('redirectUrl');  // Supprime l'URL de redirection après l'utilisation

        this.router.navigate([redirectUrl]);  // Redirige vers l'URL initialement demandée ou la page d'accueil
      } else {
        alert('Échec de la connexion');
      }
    });
  }
}
