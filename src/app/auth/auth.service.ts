import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo } from 'apollo-angular';
import { Observable, ReplaySubject } from 'rxjs';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { Profile } from '../types';
import { ApolloQueryResult } from 'apollo-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authed?: boolean;
  loading: boolean;
  profile: Profile;
  profileStream$ = new ReplaySubject<Profile>();

  constructor(public apollo: Apollo, private router: Router, private jwtHelper: JwtHelperService) {
    const token = AuthService.tokenGetter();
    if (token) {
      this.profile = this.jwtHelper.decodeToken(token);
    }
    // if (!AuthService.tokenGetter()) {
    //   this.loading = false;
    // } else {
    //   this.authed = true;
    // }
  }

  public static tokenGetter = () => localStorage.getItem('jwt_token');
  public tokenVerify = () => {
    const token = localStorage.getItem('jwt_token');
    return !this.jwtHelper.isTokenExpired(token);
  };

  public handleToken = (token: string) => {
    localStorage.setItem('jwt_token', token);
    this.profile = this.jwtHelper.decodeToken(token);
    this.profileStream$.next(this.profile);
  }

  public getProfile$ = (): Observable<ApolloQueryResult<{ profile: Profile }>> => {
    return this.apollo.query({
      query: gql`
        query profileQuery {
          profile {
            anilistName
            email
            malName
            name
            profilePicture
          }
        }
      `,
      fetchPolicy: 'no-cache'
    }).pipe(
      tap((res: ApolloQueryResult<{ profile: Profile }>) => {
        console.log(res);
      })
    );
  }

  public login = (email: string, password: string): Observable<boolean> => {
    return this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($email: String! $password: String!) {
          signIn(email: $email password: $password){
            successful
            token
          }
        }
      `,
      variables: { email, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      tap(result => {
        this.authed = true;
        this.handleToken(result.data.signIn.token);
      }),
      map(result => result.data.signIn.successful)
    );
  }

  public signUp = (variables): Observable<boolean> => {
    return this.apollo.mutate({
      mutation: gql`
        mutation SignupMutation($email: String! $password: String! $username: String!) {
          signUp(email: $email name: $username, password: $password){
            successful
            token
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    }).pipe(
      tap(result => {
        this.authed = true;
        this.handleToken(result.data.signUp.token);
      }),
      map(result => result.data.signUp.successful)
    );
  }

  public logout = (): Promise<boolean> => {
    localStorage.removeItem('jwt_token');
    this.authed = false;
    this.profile = undefined;
    return this.router.navigate(['/']);
  }
}
