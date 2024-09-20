import { Component, OnInit } from '@angular/core';
import { GiveCodeService } from '../../services/give-code.service';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MailerService } from 'src/app/core/services/mailer.service';

@Component({
  selector: 'app-give-code',
  templateUrl: './give-code.component.html',
  styleUrls: ['./give-code.component.scss'],
})
export class GiveCodeComponent  implements OnInit {

  public code : number = 0;
  public form: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _service: GiveCodeService,
    private _toastController: ToastController,
    private _mailerService: MailerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("ddd")
    
    this.generateCode()
    this.form = this._formBuilder.group({
      Code: [
        , // Default value for the control
        [
          Validators.required,
        ]
      ],
    })
  }

  generateCode(): void { 
    this._service.generateCode()
    .pipe(
      take(1)
    ).subscribe({
      next: async (code: number) => {
        this.code = code
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

  async onSubmit(): Promise<void> { 
    const verificationCode = this.route.snapshot.paramMap.get('code');
    this._mailerService.sendCode().subscribe(async (responce)=>{
      console.log(responce)
      if (responce.body.res==true){
        this._router.navigate(['first-connexion/password/'+responce.body.token])
      }else {
        const toast = await this._toastController.create({
          message: "Vous avez saisi un mauvais code",
          duration: 10000,
          position: 'top',
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
    })
    
  }

}
