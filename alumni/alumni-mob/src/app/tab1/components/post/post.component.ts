import { Component, OnDestroy, OnInit } from '@angular/core'
import { InternType } from '../../../core/types/intern/intern-type'
import { InternService } from 'src/app/core/services/intern.service'
import { Subscription } from 'rxjs'
import { PostService } from 'src/app/core/services/post.service'
import { PostType } from 'src/app/core/types/post/post.type'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {

  /**
   * List of interns to be displayed in the view
   * @var InternType[]
   */
  public posts: Array<PostType> = []

  public isFilterActive = false

  private _subscription!: Subscription

  constructor(
    private _service: PostService // Dependency Injection
  ) {}

  ngOnInit(): void {
    this._subscription = this._service.findAll()
      .subscribe({
        next: (posts: Array<PostType>) => {
          this.posts = posts
        },
        error: (error: any) => {},
        complete: () => {}
      })
  }

  ngOnDestroy(): void {
      this._subscription.unsubscribe()
  }
}
