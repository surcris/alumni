import { Component, OnInit } from '@angular/core';
import { InternType } from '../core/types/intern/inter-type';
import { ActivatedRoute } from '@angular/router';
import { InternService } from '../core/services/intern.service';
import { PostType } from '../core/types/post/post-type';
import { PostService } from '../core/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  intern: InternType | null = null;
  posts: PostType[] = [];

  constructor(private route: ActivatedRoute,
    private internService: InternService,
    private postService: PostService) { 
      console.log("un truc")
    }

  ngOnInit() { 
    console.log('ngOnInit executed in ProfilePage')
   
      this.internService.getProfileData().subscribe(
        (data: InternType) => {
          console.log('Profile data:', data); 
          this.intern = data;
        },
        (error) => {
          console.error('Error fetching intern profile', error);
        }
      );
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) { 
          this.postService.findPostsByAuthor(id).subscribe({
            next: (posts: PostType[]) => {
              console.log('User posts:', posts);
              this.posts = posts;
            },
            error: (err) => {
              console.error('Failed to load posts:', err);
            }
          })
        } else {
          console.error('Author ID is not defined in the route.');}
     });
    }


}


