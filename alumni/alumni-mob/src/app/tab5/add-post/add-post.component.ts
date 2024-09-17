import { Component, OnInit } from '@angular/core';
import { TypePost } from 'src/app/core/enums/post/type-post-enum';
import { PostType } from 'src/app/core/types/post/post-type';



@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})


export class AddPostComponent implements OnInit {
  postType!: 'text' | 'photo' | 'video' | 'text';
  postContent: string = '';
  typepost: TypePost | undefined;

  // constructor(private postService: PostService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addPost(): void {
    const newPost: PostType = {
      id: Date.now().toString(),
      type: this.typepost,
      content: this.postContent,
      createdAt: new Date()
    };
    // this.postService.addPost(newPost);
    this.postContent = '';
  }
  
}
