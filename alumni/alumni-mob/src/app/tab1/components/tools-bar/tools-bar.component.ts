import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: ['./tools-bar.component.scss'],
})
export class ToolsBarComponent  implements OnInit {

  buttonColor: string = 'white';
  isWhite: boolean = true;

  constructor() { }

  ngOnInit() {}

  changeColor() {
    this.isWhite = !this.isWhite
    if(this.isWhite)
      this.buttonColor = 'white';
    else
      this.buttonColor = 'danger'
  }

}
