import { Injectable } from '@angular/core';
import { InternService } from './intern.service';
import { Socket } from 'ngx-socket-io';
import { InternDTO } from '../internDto/internDto';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {

  constructor(
    private _socket: Socket,
    private _internService: InternService,
  ) { 

  }

  connexion():boolean{

    //obtenir l'id de l'intern 
    let idReceived ;
    let connexionResultat:boolean = true


    //A CHANGER IMPERATIVEMENT
    this._internService.findAll().subscribe((data: InternDTO[]) => { 
      data.forEach(intern => {
        if (intern.emails) {
          if (intern.emails[0] == "test@lol.fr") {
            idReceived = intern.id
            console.log(idReceived)
          }
        }
        
      }) 
    });

    
    //faire l'envoi de l'id au gateway
    this._socket.ioSocket.io.opts.query = { idReceived };

    this._socket.connect((error: any) => {
      console.error(`Something went wrong while connecting to socket : ${error}`)
      connexionResultat= false
    })
    
    return connexionResultat
    
  }
}
