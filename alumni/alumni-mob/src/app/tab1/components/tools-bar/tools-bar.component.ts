import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: ['./tools-bar.component.scss'],
})
export class ToolsBarComponent  implements OnInit {

  buttonColor: string = 'white';
  isWhite: boolean = true;
  listButtonColor: [string, Boolean][] = []
  private maxButton: number = 2

  constructor() { }

  ngOnInit() {
    this.fillListButtonColor()
  }

  changeColor(indiceButton: number) {
    this.listButtonColor[indiceButton][1] = !this.listButtonColor[indiceButton][1]
    if(this.listButtonColor[indiceButton][1])
      this.listButtonColor[indiceButton][0] = 'white';
    else
    this.listButtonColor[indiceButton][0] = 'danger'
  }

  private fillListButtonColor(){
    for(let i = 0; i < this.maxButton; i++){
      this.listButtonColor.push(["white", true])
    }
  }

}
