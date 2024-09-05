import { Component, OnInit } from '@angular/core';
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type';
import { InternDTO } from '../core/internDto/internDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss'],
})
export class MessagerieComponent implements OnInit {
  public interns: Array<InternDTO> = [];

  constructor(
    private _internService: InternService,    
    private _router: Router // Inject the Router
  ) {}

  ngOnInit() {
    // Load all interns when the component initializes
    this._internService.findAll().subscribe((interns: Array<InternDTO>) => {
      this.interns = interns;
    });
  }

  // Method to select an intern and set it in the service
  selectIntern(intern: InternDTO): void {
    this._internService.intern = intern;
  }
  openChat(intern: InternDTO) {
    this.selectIntern(intern);
    // Navigate to the ChatComponent within the same tab
    this._router.navigate(['/chat']);
  }
}
