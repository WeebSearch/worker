import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apollo: Apollo;
  jwtHelper: JwtHelperService;
  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public isAuthenticated(): Observable<boolean> {
    console.log('checking auth')
    const token = localStorage.getItem('token');

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return Observable.create(false);
    }

    return this.apollo.mutate({
      mutation: gql`
        query ($token: String!) {
          auth(token: $token) {
            successful
          }
        }
      `,
      variables: {
        token
      }
    });
  }
}
