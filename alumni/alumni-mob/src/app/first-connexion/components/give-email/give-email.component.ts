import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      Email: [
        '@poe.aelion.fr', // Default value for the control
        [
          Validators.required
        ]
      ],
    })
  }

  onSubmit(): void {
    this._router
  }

}
