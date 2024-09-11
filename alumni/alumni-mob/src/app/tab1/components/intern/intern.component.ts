import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { take } from 'rxjs';

import { WsChatService } from 'src/app/core/services/ws-chat-service'; 
import { SocketConnectionType } from '../../../tab3/Dto/socket-connection.type'; 
import { SocketMessageType } from '../../../tab3/Dto/socket-message.type'; 
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type'; 
import { InternDTO } from 'src/app/core/internDto/internDto';
import { Router } from '@angular/router';
import { MessagerieService } from 'src/app/core/services/messagerie.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-intern', 
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent  implements OnInit {

  @Input() 
  interns: InternDTO[] = []; 
  detailsVisibility: boolean[] = [];
  constructor(private internService: InternService,
    private router: Router,
    private _mesService: MessagerieService,
    // private _userService: UserService
  ) {
    this.detailsVisibility = new Array(this.interns.length).fill(false);
  } 
  
  ngOnInit(): void { 
    this.internService.findAll().subscribe((data: InternDTO[]) => { 
      this.interns = data; });
   }
   viewDetails(index: number): void {
    console.log("Connected users:");
    this.detailsVisibility[index] = !this.detailsVisibility[index];
    this._mesService.getAllConnected().subscribe({
      next: (users: string[]) => {
        // this.connectedUsers = users;
        console.log('Utilisateurs connectés:', users);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs connectés:', error);
      }
    });
  }

  openChat(intern: InternDTO): void {

    //alert(`Ouverture du chat pour ${intern.firstname} ${intern.lastname}`);
    this.router
      .navigate(['chat'])  // Navigation vers la route 'tabs/tab3/chat/:id'
      .then(() => console.log('Routing complete'));  // Log dans la console après la navigation
  }

 } 

