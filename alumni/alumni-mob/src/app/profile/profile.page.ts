import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { PostService } from '../core/services/post.service';
import { take } from 'rxjs';
import { PostTransfo } from '../core/transformers/post-transfo';
import { InternTransfo } from '../core/transformers/intern-transfo';
import { InternDTO } from '../core/internDto/internDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  intern: InternDTO | undefined;
  posts: PostTransfo[] = [];

  constructor(
    private internService: InternService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.retriveUserInfos()
    this.retriveAllUserPost()
  }


  private retriveUserInfos() {
    this.internService.getProfileData().pipe(take(1))
      .subscribe({
        next: (intern: InternDTO) => {
          this.intern = intern
        },
        error: (error: any) => { },
        complete: () => { }
      })
  }

  private retriveAllUserPost() {
    this.postService.findPostsByAuthor().pipe(take(1))
      .subscribe({
        next: (posts: Array<PostTransfo>) => {
          this.posts.push(...posts)
          console.log("POSTS: "+this.posts.toString())
        },
        error: (error: any) => { },
        complete: () => { }
      })
  }
}

