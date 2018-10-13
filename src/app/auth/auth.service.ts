import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { debounceTime, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Profile } from '../types';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;
  name?: string;
  profileUrl?: string;
  authed?: boolean;
  loading: boolean;

  constructor(public apollo: Apollo, private cookie: CookieService) {
    if (!cookie.check('wsid')) {
      this.authed = false;
      this.loading = false;
      this.getProfile$().subscribe(result => {
        if (!result.errors) {
          this.authed = true;
        }
      });
    }
    //
    // this.jwtHelper = new JwtHelperService();
    // this.loading = true;
    // this.getProfile$().subscribe(auth => {
    //   this.loading = false;
    //   console.log(auth);
    // });
  }

  public handle403 = () => {
    this.name = undefined;
    this.profileUrl = undefined;
  }

  public getProfile$ = (): Observable<ApolloQueryResult<Profile>> => {
    return this.apollo.query({
      query: gql`
        query profileQuery {
          profile {
            anilistName
            email
            malName
            name
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
  }

  public login = (email: string, password: string): Observable<boolean> => {
    return this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($email: String! $password: String!) {
          signIn(email: $email password: $password){
            successful
          }
        }
      `,
      variables: { email, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => result.data.signIn.successful)
    );
  }

}
