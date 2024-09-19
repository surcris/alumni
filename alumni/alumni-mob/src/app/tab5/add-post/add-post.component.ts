import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
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
  formData!: FormData;


  ngOnInit(): void {
    this.listPostType= Object.values(TypePost)
    this.formData = new FormData();
    throw new Error('Method not implemented.');
  }
  closeModal() {
    throw new Error('Method not implemented.');
    }
      presentingElement = null;
    
      
      constructor(private actionSheetCtrl: ActionSheetController, private postService: PostService, private modalCtrl: ModalController ) {}
    
      //  ngOnInit() {
      //    this.presentingElement = document.querySelector('tab5');
      //  }
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
          postedAt: new Date(),
        };
          this.formData.append("postinfo", JSON.stringify(newPost))
          this.postService.addPost(this.formData);
      
      }

     

      onPhotoChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
          this.photoFile = file;
        }
      }
    
      // form: FormGroup = new FormGroup({
      //   tittle: new FormControl(''),
      //   content: new FormControl('')
      // });
    
      onSubmit() {
        console.log(`Titre: ${this.title}`);
        console.log(`Post: ${this.postContent}`);
        console.log(`Type de post: ${this.typepost}`);
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
      onFileSelected(event: { target: { files: File[]; }; }) {

        const file:File = event.target.files[0];

        if (file) {
            this.formData.append("media", file);
        }
      
}}
