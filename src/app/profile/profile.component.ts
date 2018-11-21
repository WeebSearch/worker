import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile = {
    avatar: '',
    name: ''
  };
  links = [
    { name: 'Edit Profile' },
    { name: 'Favorites' }
  ];

  constructor(public auth: AuthService) {
    this.profile.name = auth.profile.name;
    this.profile.avatar = auth.profile.profilePicture || 'assets/default.jpg';
    console.log(this.auth.profile);
  }

  ngOnInit() {
  }

}
