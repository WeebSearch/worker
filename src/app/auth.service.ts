import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService;
  authed?: boolean;
  loading: boolean;

  constructor(public apollo: Apollo) {
    this.jwtHelper = new JwtHelperService();
    this.loading = true;
    this.isAuthenticated$().subscribe(auth => {
      this.loading = false;
      this.authed = auth;
    });
  }

  public isAuthenticated$ = (): Observable<any> => {
    // console.log('checking auth');
    // const token = localStorage.getItem('token');
    //
    // if (!token || this.jwtHelper.isTokenExpired(token)) {
    //   return Observable.create(false);
    // }

    return this.apollo.mutate<{ auth: { successful: boolean } }>({
      mutation: gql`
        mutation AuthQuery($token: String!) {
          auth(token: $token) {
            successful
          }
        }
      `,
      variables: {
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjam16aDE3N2gwcGt4MDg2M2VseW8xbjF2IiwiaWF0IjoxNTM4OTUzNDU1LCJleHAiOjE1Mzk4MTc0NTV9.q2D_dNuxIx7mQ4Q9u2o5Wnc1UUk_G1JLfO1jZNEE6Ag`
      }
    }).pipe(map(result => result.data.auth.successful));
  };

  public login = (email: string, password: string) => {
    return this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($email: String! $password: String!) {
          signIn(email: $email password: $password){
            successful
          }
        }
      `,
      variables: {email, password}
    }).pipe(map(result => result.data.signIn.successful))
  }
}
