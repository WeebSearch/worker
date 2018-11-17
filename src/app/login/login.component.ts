import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { random } from '../utils';
import { debounceTime, filter, flatMap, tap } from 'rxjs/operators';
import { BehaviorSubject, defer, from, fromEvent, Observable, pipe, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

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
  public switchForm = 'Sign Up instead';
  public destination = '/';
  public login = random(this.prompts);
  public loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    username: new FormControl()
  });
  private loginStream$ = new Subject<{ email: string, password: string}>();
  private signUpStream$ = new Subject<{ email: string, password: string, username: string }>();
  loggingIn = false;

  constructor(public auth: AuthService, private router: Router) {
    router.events.subscribe(event => {
      this.destination = event['destination'] || '/';
    });
  }

  setLoginDefault = (elem) => {
    this.login = this.formMode;
  }
  setLoginRandom = (elem) => {
    this.login = random(this.prompts);
  }

  private nagivateToDestination = () => {
    return this.router.navigateByUrl(this.destination);
  }

  otherFormMode = () =>
    this.formMode === 'Login' ? 'Sign Up' : 'Login'

  changeFormMode = () => {
    this.formMode = this.otherFormMode();
    this.switchForm = this.switchForm === 'Login instead' ? 'Sign Up instead' : 'Login instead';
  }

  ngOnInit() {
    this.loginStream$.pipe(
      flatMap(({ email, password }) => {
        this.loggingIn = true;
        return this.auth.login(email, password);
      }),
      tap(() => {
        this.loggingIn = false;
      }),
      filter(success => Boolean(success))
    ).subscribe(this.nagivateToDestination);
    this.signUpStream$.pipe(
      flatMap((vars) => {
        this.loggingIn = true;
        return this.auth.signUp(vars);
      }),
      tap(() => {
        this.loggingIn = false;
      }),
      filter(success => Boolean(success))
    ).subscribe(this.nagivateToDestination);
  }

  public attemptLogin = (event: Event) => {
    event.preventDefault();
    const { controls } = this.loginForm;
    const { username, email, password } = controls;
    if (username.value)  {
      return this.signUpStream$.next({
        username: username.value,
        email: email.value,
        password: password.value
      });
    }
    return this.loginStream$.next({
      email: email.value,
      password: password.value
    });
  }
}
