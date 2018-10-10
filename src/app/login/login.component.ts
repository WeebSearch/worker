import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { random } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public prompts = [
    'Rescue the useless goddess',
    'Travel to Yoitsu',
    'Find Kira',
    'Fight the tabletop tiger',
    'Pet Kanna',
    'Escape Aircrad',
    'Embarrass Hifumi',
    'Trick Satania'
  ];
  public formMode = 'Login';
  public loginButtonPrompt = random(this.prompts);
  public login = this.loginButtonPrompt;
  loggingIn = false;

  constructor(public auth: AuthService, private router: Router) {
  }

  setLoginDefault = (elem) => {
    this.login = this.formMode;
  }
  setLoginRandom = (elem) => {
    this.login = this.loginButtonPrompt;
  }

  ngOnInit() {
  }

  public attemptLogin = (emailInput: HTMLInputElement, passInput: HTMLInputElement, event: Event) => {
    const { value: email } = emailInput;
    const { value: password } = passInput;
    event.preventDefault();

    this.loggingIn = true;
    this.auth.login(email, password).subscribe(success => {
      this.loggingIn = false;
      if (success) {
        return this.router.navigate(['/']);
      }
    });

  }
}
