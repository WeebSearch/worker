import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { Apollo } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AnimeViewerComponent } from './anime-viewer/anime-viewer.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'anime/:name', component: AnimeViewerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [AppComponent, NavComponent, LoginComponent, PageNotFoundComponent, HomeComponent, AnimeViewerComponent, ProfileComponent],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), HttpLinkModule, HttpClientModule],
  providers: [Apollo, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink) {
    const link = httpLink.create({
      uri: 'http://localhost:4000',
      // withCredentials: true
    });

    apollo.create({ link, cache: new InMemoryCache() });
  }
}
