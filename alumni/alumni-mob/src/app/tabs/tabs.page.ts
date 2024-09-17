import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TypePost } from '../core/enums/post/type-post-enum';
import { PostType } from '../core/types/post/post-type';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})


export class TabsPage {
  videoFile: any;
  photoFile: any;
  postService: any;
closeModal() {
throw new Error('Method not implemented.');
}
  postType!: 'text' | 'photo' | 'video' | 'text';
  postContent: string = '';
  typepost: TypePost | undefined;
  presentingElement = null;

  
  constructor(private actionSheetCtrl: ActionSheetController) {}

  // ngOnInit() {
  //   this.presentingElement = document.querySelector('tab5');
  // }
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
    const newPost: PostType = {
      id: Date.now().toString(),
      type: this.typepost,
      content: this.postContent,
      createdAt: new Date()
    };
     this.postService.addPost(newPost);
    this.postContent = '';
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
}