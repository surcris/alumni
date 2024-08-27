/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { PostTransfo } from 'src/app/core/transformers/post-transfo';


@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent  implements OnInit {

  @Input()
  public post!: PostTransfo
  
  constructor() { }

  ngOnInit() {}

}
