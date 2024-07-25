import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveEmailComponent } from './components/give-email/give-email.component';
import { GiveCodeComponent } from './components/give-code/give-code.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {path: '',   redirectTo: 'email', pathMatch: 'full' },
  {path: 'email',component: GiveEmailComponent},
  {path: 'code', component: GiveCodeComponent },
  {path: 'password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstConnexionPageRoutingModule {}
