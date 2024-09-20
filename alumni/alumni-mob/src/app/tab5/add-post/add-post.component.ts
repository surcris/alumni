import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { BehaviorSubject, take } from 'rxjs';
import { TypePost } from 'src/app/core/enums/post/type-post-enum';
import { PostService } from 'src/app/core/services/post.service';
import { CreatePostType } from 'src/app/core/types/post/post-type';
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],

})
export class AddPostComponent implements OnInit {
  postContent: string = '';
  typepost!: TypePost
  photoFile: any;
  videoFile: any;
  title: string = "";
  listPostType: Array<string> = [];
  private selectedFile!: File;
  private _post$: BehaviorSubject<boolean> = this.postService.posts$

  constructor(private actionSheetCtrl: ActionSheetController, private postService: PostService, private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.listPostType = Object.values(TypePost)

  }
  closeModal() {
    throw new Error('Method not implemented.');
  }
  presentingElement = null;

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  addPost(): void {
    const newPost: CreatePostType = {
      title: this.title,
      type: this.typepost,
      content: this.postContent,
      postedAt: new Date()
    };
    this.postService.addPost(newPost, this.selectedFile).pipe(take(1)).subscribe({
      next: (data) => {
        this._post$.next(data)
        this.confirm()
      }
    });

  }

  onPhotoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
    }
  }

  onVideoChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Récupérer le fichier sélectionné
  }

  isFormValid(): boolean {
    return this.postContent.trim() !== '' && this.typepost != undefined;
  }
}
