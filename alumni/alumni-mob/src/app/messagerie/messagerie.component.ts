import { Component, OnInit } from '@angular/core';
import { InternService } from 'src/app/core/services/intern.service';
import { InternType } from 'src/app/core/types/intern/inter-type';
import { InternDTO } from '../core/internDto/internDto';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss'],
})
export class MessagerieComponent implements OnInit {
  public interns: Array<InternDTO> = [];

  constructor(
    private _internService: InternService,
  ) {}

  ngOnInit() {
    // Load all interns when the component initializes
    this._internService.findAll().subscribe((interns: Array<InternDTO>) => {
      this.interns = interns;
    });
  }

  // Method to select an intern and set it in the service
  selectIntern(intern: InternType): void {
    this._internService.intern = intern;
  }
  openChat(intern: InternDTO): void {
    this._internService.intern = intern;
    // Navigate to the chat component, pass the selected intern
  }
}
