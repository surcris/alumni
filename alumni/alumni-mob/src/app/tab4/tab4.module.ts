import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ProfilePageModule } from '../profile/profile.module';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    ProfilePageModule,
    QrCodeModule
  ],
  declarations: [Tab4Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab4PageModule {}
