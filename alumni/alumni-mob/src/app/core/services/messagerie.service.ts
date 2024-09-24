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

  private messageUsersSubject = new BehaviorSubject<any[]>([]);
  messageUsers$ = this.messageUsersSubject.asObservable();

  private connectedUsersSubject = new BehaviorSubject<any[]>([]);
  connectedUsers$ = this.connectedUsersSubject.asObservable();


  whosConnected:Array<string>= []
   _id:string = "";
   public convs: Array<any> = []
   public interns: Array<InternDTO> = [];
  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _userService: UserService,
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) {
    // this.connexion()
  }

  connexion() {
    const email = this._storage.retrieve('Email');
    let idReceive: string;

    // Étape 1 : Récupérer l'ID par email
    this._internService.findByIdByEmail(email).subscribe((data) => {
      console.log('Données Intern : ', data.id);
      
      if (data.id) { 
        idReceive = data.id;
        this._id = data.id;
      }

      if (idReceive !== undefined) {
        
        // Étape 2 : Vérifier si l'utilisateur est déjà connecté
        this.amIConnected(idReceive).subscribe({
          next: (isConnected) => {
            if (!isConnected) {
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

              // Récupérer tous les utilisateurs connectés et les messages des utilisateurs
              this.getAllSocketUsersOn();
              this.getMessageUsers();

            } else {
              console.log('Vous êtes déjà connecté !');
              this.getMessageUsers();
            }

            // Étape 3 : Récupérer toutes les conversations
            this.getAllMyConv().subscribe((conversations: Array<any>) => {
              this.convs = conversations;
              console.log('Mes conversations : ', this.convs);
            });

            // Étape 4 : Récupérer tous les interns
            this._internService.findAll().subscribe((interns: Array<InternDTO>) => {
              this.interns = interns;
              console.log('Les interns : ', this.interns);
            });
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

  getMessageUsers() {
    this._socket.on('message', (message: any) => {
      console.log('Message reçu: ', message);
      this.messageUsersSubject.next(message);
      // this.whosConnected = data
    }) 
  }

  getAllSocketUsersOn() {
    this._socket.on('connectedUsers', (data: any) => {
      console.log('Users connecteed: ', data);
      this.connectedUsersSubject.next(data);
      // this.whosConnected = data
    })
  }

  getAllMyConv(){
    return this._httpClient.post<any>(this.URI + `/findAllMyConv`,{userId:this._id});
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
