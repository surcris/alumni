import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { take } from 'rxjs';

import { WsChatService } from 'src/app/core/services/ws-chat-service'; 
import { SocketConnectionType } from '../Dto/socket-connection.type'; 
import { SocketMessageType } from '../Dto/socket-message.type'; 
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type'; 
import { InternDTO } from 'src/app/core/internDto/internDto';
import { Router } from '@angular/router';
import { MessagerieService } from 'src/app/core/services/messagerie.service';

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
    private _mesService: MessagerieService
  ) {
    this.detailsVisibility = new Array(this.interns.length).fill(false);
  } 
  
  ngOnInit(): void { 
    this.internService.findAll().subscribe((data: InternDTO[]) => { 
      this.interns = data; });
   }
   viewDetails(index: number): void {
    this.detailsVisibility[index] = !this.detailsVisibility[index];
    this._mesService.connexion('string ça marche n\'importe quoi')
  }

  openChat(intern: InternDTO): void {
    alert(`Ouverture du chat pour ${intern.firstname} ${intern.lastname}`);
  } } 




