import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

interface Link {
  name: string;
  link: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  public links: Link[] = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/profile' },
    { name: 'Animes', link: '/animes' },
    { name: 'Editor', link: '/editor' },
    { name: 'Login', link: '/login' }
  ];
  constructor(public auth: AuthService, private ref: ChangeDetectorRef) {
    console.log('subscribing');
    this.auth.profileStream$.subscribe(profile => {
      console.log('change detected')
      console.log(profile)
      this.ref.markForCheck()
    });
  }


  ngOnInit() {
    // this.ref.detach()
  }

  highlight() {

  }

  debug = () => {
    // document.querySelector('body').

  }

  public _logout: () => void = () => {
    this.auth.logout();
  }
}
