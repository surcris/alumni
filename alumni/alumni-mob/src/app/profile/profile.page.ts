import { Component, OnInit } from '@angular/core';
import { InternType } from '../core/types/intern/inter-type';
import { ActivatedRoute } from '@angular/router';
import { InternService } from '../core/services/intern.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  intern: InternType | null = null;

  constructor(private route: ActivatedRoute,
    private internService: InternService) { 
      console.log("un truc")
    }

  ngOnInit() { 
    console.log('ngOnInit executed in ProfilePage')
   
      this.internService.getProfileData().subscribe(
        (data: InternType) => {
          console.log('Profile data:', data); 
          this.intern = data;
        },
        (error) => {
          console.error('Error fetching intern profile', error);
        }
      );
    }


}


