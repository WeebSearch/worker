// import { Injectable } from '@angular/core';
// import {
//   HttpErrorResponse,
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpResponse,
//   HttpResponseBase
// } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { from, Observable, throwError } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// import { catchError, map, tap } from 'rxjs/operators';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router, private cookie: CookieService) { }
//   private hasError = (response: HttpResponse<{ errors: {message: string}[] }>, message: string) =>
//     response.body.errors.some(error => error.message.includes(message));
//
//   private handleAuth = (req): Observable<HttpEvent<any>> => {
//     if (req instanceof HttpResponse) {
//       // if ()
//
//     }
//     console.log('auth handler')
//     console.log(req);
//     return req;
//   }
//
//   // public intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
//   //   // // Clone the request to add the new header.
//   //   // const authReq = req.clone({ headers: req.headers.set(tooie.tokenKey, Cookie.getToken()) });
//   //   // // catch the error, make specific functions for catching specific errors and you can chain through them with more catch operators
//   //   return next.handle(req).pipe(
//   //     map((event) => this.handleAuth(event))
//   //   ); //.pipe(catchError(this.handleAuthError)); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
//   // }
// }
