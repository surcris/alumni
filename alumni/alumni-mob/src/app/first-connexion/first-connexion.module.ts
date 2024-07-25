import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstConnexionPageRoutingModule } from './first-connexion-routing.module';

import { FirstConnexionPage } from './first-connexion.page';
import { GiveEmailComponent } from './components/give-email/give-email.component';
import { GiveCodeComponent } from './components/give-code/give-code.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstConnexionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FirstConnexionPage, GiveEmailComponent, GiveCodeComponent, ChangePasswordComponent]
})
export class FirstConnexionPageModule {}
