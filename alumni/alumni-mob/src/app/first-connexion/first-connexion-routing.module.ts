import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveEmailComponent } from './components/give-email/give-email.component';

const routes: Routes = [
  {path: '',component: GiveEmailComponent},
  // { path: '', component: AnotherFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstConnexionPageRoutingModule {}
