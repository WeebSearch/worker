import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

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
    {name: 'Animes', link: '/login'},
    {name: 'Editor', link: '/editor'}
  ];

  constructor(private auth: AuthService) {
    auth.isAuthenticated().subscribe(item => {
      console.log('aaa');
      console.log('aaa');
      console.log('aaa');
      console.log('aaa');
      console.log(item);
    });
  }


  ngOnInit() {
  }
}
