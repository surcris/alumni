import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
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
    this.retriveAllPost()
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  onIonInfinite(ev: IonInfiniteScrollCustomEvent<void>) {
    this.retriveAllPost();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private retriveAllPost(){
    this._subscription = this._service.findAll()
    .subscribe({
      next: (posts: Array<PostTransfo>) => {
        this.posts.push(...posts)
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

}
