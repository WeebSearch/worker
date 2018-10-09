import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

interface Anime {
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
  public animes: Anime[];

  constructor(public apollo: Apollo) {
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

  ngOnInit() {
  }

}
