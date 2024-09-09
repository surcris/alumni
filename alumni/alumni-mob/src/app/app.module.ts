import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), SocketIoModule.forRoot(AppModule.wsConfig),AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  public static wsConfig: SocketIoConfig = {
    url: `http://${environment.socketServerUrl}`, // c'est un peu plus beau
    options: {
      autoConnect: false, // désactiver la connection automation au chargement de l'app 
    }
  }
}