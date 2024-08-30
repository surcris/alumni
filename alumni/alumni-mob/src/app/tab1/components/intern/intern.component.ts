import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternDTO } from 'src/app/core/internDto/internDto'; 
import { InternService } from 'src/app/core/services/intern.service';
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
    this._mesService.connexion()
  }

  openChat(intern: InternDTO): void {
    //alert(`Ouverture du chat pour ${intern.firstname} ${intern.lastname}`);
    this.router
      .navigate(['tabs', 'tab3'])  // Navigation vers la route 'tabs/tab3/chat/:id'
      .then(() => console.log('Routing complete'));  // Log dans la console après la navigation
  }
  


 } 
