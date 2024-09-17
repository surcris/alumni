import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PostComponent } from './components/post/post.component';
import { InternComponent } from './components/intern/intern.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { HeaderPostComponent } from './components/header-post/header-post.component';
import { ToolsBarComponent } from './components/tools-bar/tools-bar.component';
import { TypePostIconPipe } from '../core/pipes/post/type-post-icon-pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    
    
  ],
  declarations: [Tab1Page, PostComponent, PostContentComponent, HeaderPostComponent, ToolsBarComponent, TypePostIconPipe]
})
export class Tab1PageModule {}
