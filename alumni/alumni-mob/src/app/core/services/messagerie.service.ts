import { Injectable } from '@angular/core';
import { InternService } from './intern.service';
import { Socket } from 'ngx-socket-io';
import { InternDTO } from '../internDto/internDto';
import { UserService } from './user.service';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  private readonly URI: string = 'http://localhost:4000';

  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _userService: UserService,
    private _httpClient: HttpClient
  ) {}

  connexion(): boolean {
    let connexionResultat: boolean = true;
    let userId;

    this._httpClient
      .post<any>(this.URI + `/socket/getMy`, { id: '1' })
      .subscribe({
        next: async (responce: boolean) => {
          if (!responce) {
            console.log(responce)
            this._userService
              .getMyId()
              .pipe(take(1))
              .subscribe({
                next: async (data: string) => {
                  if (data) {
                    userId = data;
                    console.log(userId);
                    this._socket.ioSocket.io.opts.query = { userId };
                    this._socket.connect((error: any) => {
                      console.error(`Erreur lors de la connexion : ${error}`);
                      connexionResultat = false;
                    });
                  } else {
                    console.error(`Problème lors de la requète`);
                  }
                },
                error: (error: any) => {},
                complete: () => {},
              });
          }
        },
      });
    //obtenir l'id de l'intern

    //faire l'envoi de l'id au gateway

    // console.log(connexionResultat)
    return connexionResultat;
  }

  send(message: string, destId: string) {
    let senderId;

    //envoie du message
    // this._socket.emit()
  }

  disconnect(): void {
    this._socket.disconnect();
  }
}
