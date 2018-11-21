import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { random } from '../utils';
import { LoaderService } from '../services/loader.service';

interface Anime {
  id: string;
  rawName: string;
  characters: any[];
  episodes: any[];
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animes: Anime[] = [];
  private _search: string;
  get search () { return this._search; }
  set search (value) {
    this.onKeyDownSearch();
    this._search = value;
  }

  public missingThumbnailPlaceholders = [
    'shrug1.jpg',
    'shrug2.png',
    'shrug3.png',
    'shrug4.png',
    // 'shrug5.jpg',
    'shrugsparent.png',
    'shrug6.png',
  ].map(file => `assets/shrugs/${file}`);

  public placeholders: string[] = [];
  public loadingGif = this.loader.randomLoader();


  constructor(public apollo: Apollo, public router: Router, public loader: LoaderService) {
    this.loadAnimes();
  }

  ngOnInit() {
  }

  onKeyDownSearch = () => {
    console.log(this.search);
  }
  animeLink = (id: string) => {
    return `/anime/${id}`;
  }
  requestAnimes = (search: string) => {

  }
  loadAnimes = (paginate: number = 0) => {
    this.apollo.query<{ animes: Anime[] }>({
      query: gql`
        query {
          animes {
            id
            rawName
            thumbnailUrl
            characters {
              rawName
            }
            episodes {
              id
            }
          }
        }
      `,
    }).pipe(map(res => res.data.animes)).subscribe(items => {
      this.animes = items.sort((a, b) => a.rawName > b.rawName ? -1 : 1);
    });
  }

  dialogueCount = () => {
    return this.apollo.query({
      query: gql`
        query {
          
        }
      `
    })
  }

}
