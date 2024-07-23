/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertButton } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss'],
})
export class AccountHomeComponent  implements OnInit {

  public buttons: Array<AlertButton> = []

  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.buttons.push({
      text: 'Oui',
      role: 'confirm',
      handler: () => this.doDisconnect()
    })
    this.buttons.push({
      text: 'Non',
      role: 'cancel',
      cssClass: 'warn'
    })
  }

  doDisconnect(): void {
    this._storageService.remove('auth')
    this._router.navigate(['/'])
  }

}
