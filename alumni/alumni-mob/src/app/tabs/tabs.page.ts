import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPostComponent } from '../tab5/add-post/add-post.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddPostComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}