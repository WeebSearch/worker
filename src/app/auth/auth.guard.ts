import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

type Activation = Observable<boolean> | Promise<boolean> | boolean;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    redirect: boolean = true): Activation => {
    const authed = Boolean(this.auth.tokenVerify());
    if (!authed) {
      this.router.navigate(['/login']);
    }
    return authed;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => !Boolean(this.auth.tokenVerify())

}
