import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { PostTransfo } from 'src/app/core/transformers/post-transfo';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit{

  /**
   * List of interns to be displayed in the view
   * @var InterType[]
   */
  public posts: Array<PostTransfo> = []
  public isFilter: boolean = false

  private page: number = 0;

  private _post$: BehaviorSubject<any> = this._service.posts$

  constructor(
    // private _serviceIntern: InternService, // Dependency Injection
    private _service: PostService,
    private toastController: ToastController
  ){
  }

  ngOnInit(): void {
    this.page = 0
    this.retriveAllPost()
    this._post$.subscribe((newPost: any) => {
      if (newPost) {
        this.posts.unshift(newPost)
      }
    })
  }


  onIonInfinite(ev: IonInfiniteScrollCustomEvent<void>) {
    this.retriveAllPost();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  private retriveAllPost(){
    this._service.findAll(this.page).pipe(take(1))
    .subscribe({
      next: (posts: Array<PostTransfo>) => {
        this.posts.push(...posts)
        this.page += 1
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }

    // Function to check if the media is an image
    isImage(media: string|undefined): boolean {
      if(media)
        return /\.(jpg|jpeg|png|gif)$/i.test(media);
      return false
    }
  
    // Function to check if the media is a video
    isVideo(media: string|undefined): boolean {
      if(media)
        return /\.(mp4|webm|ogg)$/i.test(media);
      return false
    }

}
