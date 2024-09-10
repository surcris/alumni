import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Users } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  users: Users = [];

  constructor(private userSerivce: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.userSerivce.getUsers().subscribe((users: Users) => {
      this.users = users;
    });
  }




}
