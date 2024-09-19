import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { AddPostComponent } from '../tab5/add-post/add-post.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,    
  ],
  declarations: [TabsPage, AddPostComponent,]
})
export class TabsPageModule {}
