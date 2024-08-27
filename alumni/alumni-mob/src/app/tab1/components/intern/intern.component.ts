import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternDTO } from 'src/app/core/internDto/internDto'; 
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/intern-type'; 

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
    private router: Router
  ) {
    this.detailsVisibility = new Array(this.interns.length).fill(false);
  } 
  
  ngOnInit(): void { 
    this.internService.findAll().subscribe((data: InternDTO[]) => { 
      this.interns = data; });
   }
   viewDetails(index: number): void {
    this.detailsVisibility[index] = !this.detailsVisibility[index];
  }

  openChat(intern: InternDTO): void {
    alert(`Ouverture du chat pour ${intern.firstname} ${intern.lastname}`);
  } } 
