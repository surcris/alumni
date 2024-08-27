import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { PostTransfo } from 'src/app/core/transformers/post-transfo';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy{

  /**
   * List of interns to be displayed in the view
   * @var InterType[]
   */
  public posts: Array<PostTransfo> = []
  public isFilter: boolean = false
  // private _subscriptionIntern!: Subscription
  private _subscription!: Subscription

  constructor(
    // private _serviceIntern: InternService, // Dependency Injection
    private _service: PostService
  ){}

  ngOnInit(): void {
      this._subscription = this._service.findAll()
      .subscribe({
        next: (posts: Array<PostTransfo>) => {
          this.posts = posts
          this.posts = this._service.sortPost(this.posts)
        },
        error: (error: any) => {},
        complete: () => {}
      })
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
