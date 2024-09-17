import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { cookieInterceptor } from './core/interceptors/cookie.interceptor';
import { AddPostComponent } from './tab5/add-post/add-post.component';


@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(AppModule.wsConfig),
    AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(
      withInterceptors([cookieInterceptor])
    )
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static wsConfig: SocketIoConfig = {
    url: `http://${environment.socketServerUrl}`, // c'est un peu plus beau
    options: {
      autoConnect: false, // désactiver la connection automation au chargement de l'app 
      reconnection:false
    }
  }
}