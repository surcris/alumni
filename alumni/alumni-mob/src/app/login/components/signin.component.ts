/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { map, take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { InternService } from 'src/app/core/services/intern.service';
import { MessagerieService } from 'src/app/core/services/messagerie.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  private desiredUrl = ''

  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService,
    private route: ActivatedRoute,
    private _internService:InternService,
    private _messageService:MessagerieService
  ) {}

  ngOnInit(): void {
    const email = this._storage.retrieve('Email');
    this.form = this._formBuilder.group({
      login: [
        email != null ? email : '', // Default value for the control
        [Validators.required],
      ],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    // Affiche les valeurs du formulaire pour vérification
    console.log(this.form.value);
  
    // Appel au service d'authentification
    this._service.doAuth(this.form.value).subscribe({
      next: async (isValid) => {
        const responseBody = isValid.body;
        console.log(responseBody);
  
        // Si le statut est 204 (succès)
        if (responseBody.status === 204) {
          // Stocker le token d'authentification
          this._storage.store('auth', responseBody.token);
          this._storage.store('Email', this.form.value.login);
          // Récupérer l'URL désirée ou rediriger par défaut
          this.desiredUrl = this.route.snapshot.queryParams['desiredUrl'];
  
          // Connection socket
          this._messageService.connexion()
  
          // Redirection après authentification réussie
          if (this.desiredUrl) {
            //if the cookie is persistent this code: { queryParams: { refresh: true } can be deleted
            this._router.navigate([this.desiredUrl], { queryParams: { refresh: true } });
          } else {
            //if the cookie is persistent this code: { queryParams: { refresh: true } can be deleted
            this._router.navigate(['tabs/tab1'], { queryParams: { refresh: true } });
          }
  
        } else {
          // Gestion d'une réponse non valide (pas 204)
          await this.displayErrorToast('Échec de l\'authentification. Veuillez réessayer.');
          this.form.reset();
        }
      },
      error: async (error) => {
        // Gestion d'une erreur survenue pendant l'appel au service
        await this.displayErrorToast('Échec de l\'authentification. Veuillez réessayer.');
        this.form.reset();
      }
    });
  }
  

  private async displayErrorToast(message: string): Promise<void> {
    const toast = await this._toastController.create({
      message,
      duration: 2000,
      position: 'middle',
      buttons: [
        {
          text: 'Réessayer',
        },
      ],
    });
    
    await toast.present();
  }

  onClickActiveAccount() {
    this._router.navigate(['first-connexion']);
  }
}
