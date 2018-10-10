import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

interface Link {
  name: string;
  link: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [AuthService]
})
export class NavComponent implements OnInit {
  public links: Link[] = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/profile' },
    { name: 'Animes', link: '/animes' },
    { name: 'Editor', link: '/editor' },
    { name: 'Login', link: '/login' }
  ];

  constructor(public auth: AuthService, private router: Router) {
    auth.isAuthenticated$().subscribe(console.log);
  }


  ngOnInit() {
  }

  highlight() {

  }

  debug = () => {
    // document.querySelector('body').

  }
}
