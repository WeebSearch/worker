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
  public destination = '/';
  public loginButtonPrompt = random(this.prompts);
  public login = this.loginButtonPrompt;
  public loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  private loginStream$ = new Subject<{ email: string, password: string }>();
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
    this.login = this.loginButtonPrompt;
  }

  private nagivateToDestination = () => {
    return this.router.navigateByUrl(this.destination);
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
  }

  public attemptLogin = (event: Event) => {
    event.preventDefault();
    const { controls } = this.loginForm;
    return this.loginStream$.next({
      email: controls['email'].value,
      password: controls['password'].value
    });
  }
}
