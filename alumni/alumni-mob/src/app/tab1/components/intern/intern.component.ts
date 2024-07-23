/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, input, Input, OnInit } from '@angular/core';
import { InternType } from 'src/app/core/types/intern/intern-type';
import { PostType } from 'src/app/core/types/post/post.type';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent  implements OnInit {
  @Input()
  public intern!: InternType

  @Input()
  post: PostType | null = null

  constructor() { }

  ngOnInit(): void {}

}
