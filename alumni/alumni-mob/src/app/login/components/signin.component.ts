/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { map, take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

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
    private route: ActivatedRoute
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
    console.log(this.form.value)
    this._service.doAuth(this.form.value)
      .subscribe({
        next: async (isValid) => {
          console.log(isValid)
          // if (isValid.body.status === 204) {
          //   console.log('Authentification réussie', isValid);
          //   // Effectuer d'autres actions si l'authentification est réussie
          // } else {
          //   console.log('Authentification échouée');
          //   // Gérer l'échec de l'authentification
          // }
          if (isValid.body.status === 204) {
            this._storage.store('auth', isValid.body.token);
            this.desiredUrl = this.route.snapshot.queryParams['desiredUrl'];
            console.log('url' + this.desiredUrl)
            
            if (this.desiredUrl){
              this._router.navigateByUrl(this.desiredUrl);
            } else
            this._router.navigateByUrl('tabs/tab1');
          } else {
            
            const toast = await this._toastController.create({
              message: isValid.body.message,
              duration: 2000,
              position: 'middle',
              buttons: [
                {
                  text: 'Réessayer',
                },
              ],
            });
            toast.present().then(() => null);
            toast.onWillDismiss().then(() => this.form.reset());
          }
        },
        error: (error: any) => {
          console.log(`ko, je dois afficher un toast ${JSON.stringify(error)}`);
        },
      });

    // this._service.doLogin(this.form.value)
    //   .pipe(
    //     take(1)
    //   )
    //   .subscribe({
    //     next: async(response: HttpResponse<any>) => {
    //       if (response.status === 200) {
    //         this._storage.store('auth', response.body.token)
    //         this._router.navigate(['tabs', 'tab1'])
    //           .then(() => console.log('Routing complete'))
    //       } else {
    //         const toast = await this._toastController.create({
    //           message: response.body.message,
    //           duration: 2000,
    //           position: 'middle',
    //           buttons: [
    //             {
    //               text: 'Réessayer',
    //             }
    //           ]
    //         })
    //         toast.present().then(() => null)
    //         toast.onWillDismiss()
    //           .then(() => this.form.reset())
    //       }
    //     },
    //     error: (error: any) => {
    //       console.log(`ko, je dois afficher un toast ${JSON.stringify(error)}`)
    //     }
    //   })
  }

  onClickActiveAccount() {
    this._router.navigate(['first-connexion']);
  }
}
