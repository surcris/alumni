import { Injectable } from '@angular/core';
import { InternService } from './intern.service';
import { Socket } from 'ngx-socket-io';
import { InternDTO } from '../internDto/internDto';
import { UserService } from './user.service';
import { catchError, EMPTY, Observable, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagerieService {
  private readonly URI: string = `${environment.baseURL}:4000`;

  constructor(
    private _socket: Socket,
    private _internService: InternService,
    private _userService: UserService,
    private _httpClient: HttpClient
  ) {}

  connexion(): void {
    this._userService.getMyId().pipe(
      take(1),
      switchMap((data: string) => {
        if (data) {
          console.log('ID reçu du gateway :', data);
          
          // Vérification de l'existence d'un socket pour cet utilisateur
          return this._httpClient.post<boolean>(this.URI + `/socket/getMy`, { id: data }).pipe(
            tap((response: boolean) => {
              if (!response) {
                console.log('Création du socket utilisateur');
                const userId = data;
                
                // Mise à jour de la configuration du socket
                this._socket.ioSocket.io.opts.query = { userId };
                
                // Connexion au socket
                this._socket.connect((error: any) => {
                  if (error) {
                    console.error(`Erreur lors de la connexion : ${error}`);
                  } else {
                    console.log('Connexion réussie au socket.');
                  }
                });
              } else {
                console.log('Le socket existe déjà pour cet utilisateur.');
              }
            })
          );
        } else {
          console.error('Problème lors de la requête pour récupérer l’ID');
          return EMPTY;  // Observable vide si pas d'ID
        }
      }),
      catchError((error: any) => {
        console.error('Erreur lors de la connexion :', error);
        return EMPTY;  // Observable vide en cas d'erreur
      })
    ).subscribe();  // On s'abonne à l'Observable, même si rien n'est retourné
  }
  
  getAllConnected(){
    return this._httpClient.get<any>(this.URI + `/socket/getAll`)
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
