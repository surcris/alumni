import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { ChatComponent } from './tab3/chat/chat.component';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'first-connexion',
    loadChildren: () => import('./first-connexion/first-connexion.module').then( m => m.FirstConnexionPageModule)
  },
  { path: 'messagerie', component: MessagerieComponent },
  { path: 'chat', component: ChatComponent},
  // { path: '', redirectTo: '/messagerie', pathMatch: 'full' },   {
  //   path: 'tab4',
  //   loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  // },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  { path: 'edit-profile/:id', component: ProfilePage }
  
// Redirect to messagerie by default
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
