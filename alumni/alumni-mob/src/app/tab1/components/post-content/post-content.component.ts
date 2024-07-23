/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';
import { PostType } from 'src/app/core/types/post/post.type';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent  implements OnInit {

  @Input()
  public post!: PostType
  
  constructor() { }

  ngOnInit() {}

}
