import { Injectable } from '@angular/core';
import { InternService } from './intern.service';
import { Socket } from 'ngx-socket-io';
import { InternDTO } from '../internDto/internDto';
import { UserService } from './user.service';
import { BehaviorSubject, catchError, EMPTY, Observable, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { MessageType } from '../types/messagerie/message.type';

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  private readonly URI: string = `${environment.baseURL}:4000/conversation`;
  private connectedUsersSubject = new BehaviorSubject<any[]>([]);
  connectedUsers$ = this.connectedUsersSubject.asObservable();
  whosConnected:Array<string>= []
  
  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _userService: UserService,
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) {
    // this.connexion()
  }

  connexion(): void {
    const email = this._storage.retrieve('Email');
    let idReceive: string;
    this._internService.findByIdByEmail(email).subscribe((data) => {
      console.log('Données Intern : ', data.id);
      if (data.id) idReceive = data.id;
      if (idReceive != undefined) {
        this.amIConnected(idReceive).subscribe({
          next: (value) => {
            if (value === false) {
              console.log('Connexion au socket');
              const userId = idReceive;
              this._socket.ioSocket.io.opts.query = { userId };

              // Connexion au socket
              this._socket.connect((error: any) => {
                if (error) {
                  console.error(`Erreur lors de la connexion : ${error}`);
                } else {
                  console.log('Connexion réussie au socket.');
                }
              });

              this.getAllSocketUsersOn()
              
            } else {
              console.log('Vous êtes déjà connecter !!');
            }
          },
        });
      }
    });
  }
  amIConnected(idReceive: string): Observable<boolean> {
    return this._httpClient.post<boolean>(this.URI + `/socket/getMy`, {
      id: idReceive,
    });
  }

  getAllConnectedUsers() {
    this._socket.emit('getAllConnectedUsers');
    return this._socket.fromEvent('connectedUsers');
  }
  getAllSocketUsersOn() {
    this._socket.on('connectedUsers', (data: any) => {
      console.log('Users connecteed: ', data);
      this.connectedUsersSubject.next(data);
      // this.whosConnected = data
    })
  }

  getAllByRequest(){
    return this._httpClient.get<any>(this.URI + `/socket/getAll`);
  }

  send(message: string, destId: string,expeId:string) {
    const messageSend:MessageType = {
      userExp: expeId,
      userDest: destId,
      message: message
    }

    //envoie du message
    this._socket.emit("message",messageSend)
  }

  disconnect(): void {
    this._socket.disconnect();
  }
}
