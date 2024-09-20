import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { PostService } from '../core/services/post.service';
import { take } from 'rxjs';
import { PostTransfo } from '../core/transformers/post-transfo';
import { InternTransfo } from '../core/transformers/intern-transfo';
import { InternDTO } from '../core/internDto/internDto';
import { Router } from '@angular/router';

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
    private postService: PostService,
    private router: Router
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
        },
        error: (error: any) => { },
        complete: () => { }
      })
  }
  editProfile() {
    this.router.navigate(['/edit-profile', this.intern?.id]);
  }

  shareProfile() {
    const shareData = {
      title: `${this.intern?.firstname} ${this.intern?.lastname}`,
      text: `Check out ${this.intern?.firstname}'s profile`,
      url: window.location.href // URL of the current profile page
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Profile shared successfully'))
        .catch(error => console.error('Error sharing profile', error));
    } else {
      console.log('Sharing not supported on this device');
    }
  }
}

