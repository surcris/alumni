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
import { ProfileComponentComponent } from 'src/app/profile/component/profile-component.component';
import { SharedSubjectService } from 'src/app/core/services/shared-subject.service';


// short resume at the begining of the component and more description before the method

// This class is an angular component that allows !Main purpose![the display of list of interns], 
// with a button you can see more details of the intern.
// The class uses the messagerie controller who allows the connection of the intern 
// to the websocket in order to communicate with other intern.
// The opening of screen chat with the navigation.

@Component({
  selector: 'app-intern', 
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent  implements OnInit {

  @Input() 
  interns: InternDTO[] | undefined; 
  detailsVisibility: boolean[] = [];
  whosConnected: string[] = [];
  userConnected: boolean[] = []
  constructor(private internService: InternService,
    private router: Router,
    private _mesService: MessagerieService,
    private modalCtrl: ModalController,
  ) {} 
  
  ngOnInit(): void { 
    this._mesService.connexion()


    this.internService.findAll().subscribe((data: InternDTO[]) => { 
      this.interns = data;
      this.detailsVisibility = new Array(this.interns.length).fill(false);
      this.userConnected = new Array(this.interns.length).fill(false);
      console.log(this.interns)
      
      this._mesService.connectedUsers$.subscribe((connectedUsers: string[]) => {
        this.whosConnected = connectedUsers;
        this.updateDetailsVisibility();
      });
    });
   }

  viewDetails(index: number): void {
      // this._mesService.send("hello","Test1","Test2")
      this.detailsVisibility[index] = !this.detailsVisibility[index];
  }

  openChat(intern: InternDTO): void {
    this.router
      .navigate(['chat'],{ state: { intern } })  
      .then(() => console.log('Routing complete')); 
  }

  updateDetailsVisibility(): void {
    if (this.interns && this.whosConnected) {
      this.interns.forEach((intern: InternDTO, index: number) => {
        if (intern.id && this.whosConnected.includes(intern.id)) {
          this.userConnected[index] = true; 
        } else {
          this.userConnected[index] = false; 
        }
      });
    }
  }

  async openModal(intern: InternDTO) {
    const modal = await this.modalCtrl.create({
      component: ProfileComponentComponent,
      componentProps: {
        intern: intern,
        isModalRequest: true
      }
    });
    modal.present();
  }
 } 

