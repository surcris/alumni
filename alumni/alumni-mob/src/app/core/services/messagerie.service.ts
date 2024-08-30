import { Injectable } from '@angular/core';
import { InternService } from './intern.service';
import { Socket } from 'ngx-socket-io';
import { InternDTO } from '../internDto/internDto';

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  constructor(private _socket: Socket, private _internService: InternService) {}

  connexion(id:string): boolean {
    //obtenir l'id de l'intern
    let connexionResultat: boolean = true;


    //faire l'envoi de l'id au gateway
    this._socket.ioSocket.io.opts.query = { id };

    this._socket.connect((error: any) => {
      console.error(
        `Something went wrong while connecting to socket : ${error}`
      );
      connexionResultat = false;
    });
    // console.log(connexionResultat)
    return connexionResultat;
  }

  send(message:string,destId:string){
    let senderId;

    //envoie du message 
    this._socket.emit()
  }


  disconnect(): void {
    this._socket.disconnect()
  }
}