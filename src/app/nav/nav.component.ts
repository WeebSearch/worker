import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

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
    {name: 'Home', link: '/'},
    {name: 'Profile', link: '/editor'},
    {name: 'Animes', link: '/animes'},
    {name: 'Editor', link: '/editor'},
    {name: 'Login', link: '/login'}
  ];

  constructor(public auth: AuthService, private apollo: Apollo) {
    auth.isAuthenticated$().subscribe(console.log)
  }


  ngOnInit() {
  }

  highlight(){

  }
}
