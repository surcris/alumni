import { Component, OnInit } from '@angular/core';
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type';
import { InternDTO } from '../core/internDto/internDto';
import { Router } from '@angular/router';
import { WsChatService } from '../core/services/ws-chat-service';
import { MessagerieService } from '../core/services/messagerie.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss'],
})
export class MessagerieComponent implements OnInit {
  public interns: Array<InternDTO> = [];
  public convs: Array<any> = [];
  public convAndIntern: Array<any> = [];
  constructor(
    private _internService: InternService,
    private _router: Router, // Inject the Router
    private _messagerieService: MessagerieService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    // Connexion à la messagerie
    this._messagerieService.connexion()

    console.log('Les in !! ', this._messagerieService.interns,this._messagerieService.convs);
    // if (this._messagerieService.interns) {
    // this.interns = this._messagerieService.interns;

      

    for (let index = 0; index < this._messagerieService.interns.length; index++) {
      const intern = this._messagerieService.interns[index];
      
      // Vérifier si une conversation existe à cet index
      if (this._messagerieService.convs[index]) {
        const conversation = this._messagerieService.convs[index];
        
        // Comparer l'ID de l'intern avec les IDs de la conversation
        if (
          intern.id === conversation.userIdExpe ||
          intern.id === conversation.userIdDest
        ) {
          // Ajouter l'intern correspondant
          this.interns.push(intern);
    
          // Ajouter l'intern et la conversation dans convAndIntern
          this.convAndIntern.push({
            intern,
            conversation
          });
    
          // Log pour vérifier le contenu de convAndIntern
          console.log('Ma conversation trouvée : ', this.convAndIntern[0].conversation.messages, index);
        }
      }
    }
      // console.log('Mes conversations !! ', this.convs, this.interns);
   

   
  }

  // Method to select an intern and set it in the service
  selectIntern(intern: InternDTO): void {
    this._internService.intern = intern;
  }
  // openChat(intern: InternDTO) {
  //   console.log("who'r yu",intern)
  //   // this.selectIntern(intern);
  //   // Navigate to the ChatComponent within the same tab
  //   // this._router.navigate(['/chat']);
  // }

  openChat(intern: InternDTO): void {
    this._router
      .navigate(['chat'],{ state: { intern } })  
      .then(() => console.log('Routing complete')); 
  }
}
