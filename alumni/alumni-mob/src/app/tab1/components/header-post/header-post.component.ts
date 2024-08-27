import { Component, Input, OnInit } from '@angular/core';
import { InternTransfo } from 'src/app/core/transformers/intern-transfo';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent  implements OnInit {

  @Input()
  intern!: InternTransfo

  constructor() { }

  ngOnInit(): void {}


}
