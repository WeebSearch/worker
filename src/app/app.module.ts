import { BrowserModule } from '@angular/platform-browser';
import { ClassProvider, FactoryProvider, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PreloadingStrategy, Route, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AnimeViewerComponent } from './anime-viewer/anime-viewer.component';
import { ProfileComponent } from './profile/profile.component';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import { AuthInterceptor } from './auth/auth.interceptor';
import { onError } from 'apollo-link-error';
import { AuthGuard, ReverseAuthGuard } from './auth/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { LoaderService } from './services/loader.service';

class CustomPreloader implements PreloadingStrategy {
  preload(route: Route, preload: Function): Observable<any> {
    if (route.data && route.data.preload) {
      return preload();
    }
    return Observable.create(null);
  }
}


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard] },
  {
    path: 'anime', children: [
      { path: ':name', component: AnimeViewerComponent, data: { preload: true } },
      { path: ':name/episode/:episode', component: AnimeViewerComponent, data: { preload: true } },
    ]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

// const Interceptor: ClassProvider = {
//   provide: HTTP_INTERCEPTORS,
//   // useClass: AuthInterceptor,
//   multi: true
// };

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    AnimeViewerComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloader }),
    HttpLinkModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.tokenGetter,
        whitelistedDomains: ['localhost:4200', 'localhost:4000'],
      }
    }),
    ReactiveFormsModule
  ],
  providers: [Apollo, JwtHelperService, CustomPreloader, CookieService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink,
              router: Router
  ) {

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          console.log(message);
          console.log(message);
          // if (message === 'Not authorized') {
          //   return router.navigate(['/login']);
          // }
        });
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    });
    const link = httpLink.create({
      uri: 'http://localhost:4000',
      withCredentials: true
    });
    apollo.create({ link: errorLink.concat(link), cache: new InMemoryCache() });
  }
}
