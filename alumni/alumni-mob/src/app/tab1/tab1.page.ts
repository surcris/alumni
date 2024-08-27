import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ]
  constructor(
    private _alertController: AlertController,
    private _route: Router
  ) {}

  async logout(){
    const alertLogout = await this._alertController.create({
      header: 'Déconnexion',
      // subHeader: 'A Sub Header Is Optional',
      message: 'Etes-vous sur de vouloir vous déconnectez.',
      buttons: ['Cancel',{
        text: 'OK',
        role: 'confirm',
        handler: () => {
          localStorage.removeItem('auth')
          this._route.navigate(['login'])
          // this._menuController.close()
        },
      }],
    })
    await alertLogout.present();
  }
}
