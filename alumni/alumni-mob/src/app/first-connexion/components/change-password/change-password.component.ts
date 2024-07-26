import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../services/change-password.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent  implements OnInit {

  public form: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _service: ChangePasswordService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      password: [
        '', // Default value for the control
        [
          Validators.required
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ]
    })
  }

  onSubmit() {
    if (this.form.value.password === this.form.value.confirmPassword){
      const email = this._storage.retrieve('Email')
      if (email===null){
        this.createToast('Une erreur est survenue veuillez réessayer tout le processus','')
      }
      this._service.changePassword(email,this.form.value.password)
      .pipe(
        take(1)
      )
      .subscribe({
        next: async(response: HttpResponse<any>) => {
          if (response.status === 204) {
            this.createToast('Votre compte a bien été créé', 'Ok')
            this._router.navigate(['login'])
          } else {
            this.createToast(`Une erreur est survenue lors de l'initilaisation de votre mot de passe veuillez réessayer`, 'Réessayer')
          }
        }
      })
    }else{
      this.createToast('Les deux mot de passe ne sont pas identique', 'Réessayer')
    }
  }

  async createToast(message: string, textButton: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 5000,
      position: 'top',
      buttons: [
        {
          text: textButton,
        }
      ]
    })
    await toast.present()
    toast.onWillDismiss()
      .then(() => this.form.reset())
  }    
}
