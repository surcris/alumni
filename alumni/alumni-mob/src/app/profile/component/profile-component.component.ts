import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, ModalController, NavParams, ToastController } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { InternDTO } from 'src/app/core/internDto/internDto';
import { InternService } from 'src/app/core/services/intern.service';
import { PostService } from 'src/app/core/services/post.service';
import { SharedSubjectService } from 'src/app/core/services/shared-subject.service';
import { PostTransfo } from 'src/app/core/transformers/post-transfo';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss'],
})
export class ProfileComponentComponent implements OnInit {

  intern: InternDTO | undefined;
  posts: PostTransfo[] = [];
  isModalRequest: boolean = false;
  private _post$: BehaviorSubject<any> = this.postService.posts$

  constructor(
    private internService: InternService,
    private postService: PostService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if (!this.intern) {
      this.retriveUserInfos()
      this.retriveAllUserPost()
    } else {
      this.retriveAllUserPost(this.intern.userId)
    }
    this._post$.subscribe((newPost: any) => {
      if (newPost) {
        this.posts.unshift(newPost)
      }
    })
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

  private retriveAllUserPost(internId?: number) {
    this.postService.findPostsByAuthor(internId).pipe(take(1))
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


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  // Function to check if the media is an image
  isImage(media: string | undefined): boolean {
    if (media)
      return /\.(jpg|jpeg|png|gif)$/i.test(media);
    return false
  }

  // Function to check if the media is a video
  isVideo(media: string | undefined): boolean {
    if (media)
      return /\.(mp4|webm|ogg)$/i.test(media);
    return false
  }

  deletePost(postId: string){
    this.postService.deletePost(postId).pipe(take(1)).subscribe({
      next: (resp) => {
        if (resp){
          this.posts = this.posts.filter(elem => elem.id !== postId);
        }
      },
      error: (error: any) => { },
      complete: () => { }
    })
  }

  async presentAlert(postId: string) {
    const alert = await this.alertController.create({
      header: 'Are you Sure you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deletePost(postId)
          },
        },
      ]
    });

    await alert.present();
  }

  
}
