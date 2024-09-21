import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { PostService } from '../core/services/post.service';
import { take } from 'rxjs';
import { PostTransfo } from '../core/transformers/post-transfo';
import { InternTransfo } from '../core/transformers/intern-transfo';
import { InternDTO } from '../core/internDto/internDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
  
}

