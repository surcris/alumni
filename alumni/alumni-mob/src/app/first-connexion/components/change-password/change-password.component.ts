import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../services/change-password.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    throw new Error('Method not implemented.');
    }
    
}
