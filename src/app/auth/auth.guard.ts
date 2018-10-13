import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    redirect: boolean = true): Observable<boolean> | Promise<boolean> | boolean => {
    return this.auth.getProfile$().pipe(
      map(response => Boolean(!response.errors)),
      // filter((loggedIn) => Boolean(redirect) && loggedIn),
      // tap(console.log),
      // tap(() => this.router.navigate(['/login'])),
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthGuard) {
  }

  public canActivate = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => {
    return (this.auth.canActivate(next, state, false) as Observable<any>).pipe(
      map(activate => !activate)
    );
    // return (this.auth.canActivate(next, state, false) as Observable<boolean>).pipe(
    //   tap((x) => {
    //     this.router.navigateByUrl('/')
    //     console.log('====')
    //     console.log(x)
    //   }),
    //   map(activate => !activate)
    // );
  }
}
