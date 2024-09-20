import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GiveEmailService } from '../../services/give-email.service';
import { Observable, take } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';
import { MailerService } from 'src/app/core/services/mailer.service';

@Component({
  selector: 'app-give-email',
  templateUrl: './give-email.component.html',
  styleUrls: ['./give-email.component.scss'],
})
export class GiveEmailComponent  implements OnInit {

  public form: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: GiveEmailService,
    private _toastController: ToastController,
    private _storage: StorageService,
    private _mailerService: MailerService

  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Email: [
        '@poe.aelion.fr', // Default value for the control
        [
          Validators.required,
          Validators.email
        ]
      ],
    })
  }

  onSubmit(): void { 
    this._service.isValidateEmailAelion(this.form.value.Email)
    .pipe(
      take(1)
    ).subscribe({
      next: async (isValidate: boolean) => {
        if (isValidate){
          this._mailerService.sendCode().subscribe(async (res)=>{
            console.log(res)
            if (res.accepted) {
              this._storage.store('Email', this.form.value.Email)
              // this._router.navigate(['first-connexion/code'])
              const message = "Un email a été envoyer a l'adresse"+res.accepted;
              const toast = await this._toastController.create({
                message,
                duration: 2000,
                position: 'middle',
                
              });
              await toast.present();
            }
          })
          
        }else {
          const toast = await this._toastController.create({
            message: "Vous avez saisi une mauvaise adresse email ou vous n'êtes pas enregistrer dans le registre de Aelion",
            duration: 10000,
            position: 'middle',
            buttons: [
              {
                text: 'Réessayer',
              }
            ]
          })
          toast.present().then(() => null)
          toast.onWillDismiss()
            .then(() => this.form.reset())
        }
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

}
