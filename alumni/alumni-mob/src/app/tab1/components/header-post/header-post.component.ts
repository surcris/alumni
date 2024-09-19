import { Component, Input, OnInit } from '@angular/core';
import { InternDTO } from 'src/app/core/internDto/internDto';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent  implements OnInit {

  @Input()
  intern!: InternDTO | undefined

  constructor() { }

  ngOnInit(): void {}


}
