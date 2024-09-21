import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileComponentComponent } from './component/profile-component.component';
import { Tab1PageModule } from '../tab1/tab1.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    Tab1PageModule
  ],
  declarations: [ProfilePage,ProfileComponentComponent],
  exports : [ProfilePage, ProfileComponentComponent]
})
export class ProfilePageModule {}
