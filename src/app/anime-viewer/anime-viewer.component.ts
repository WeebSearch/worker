import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import gql from 'graphql-tag';


interface Episode {
  episodeNumber: string;
  file: {
    fileName: string;
  };
  anime: {
    rawName: string;
  };

}

@Component({
  selector: 'app-anime-viewer',
  templateUrl: './anime-viewer.component.html',
  styleUrls: ['./anime-viewer.component.scss']
})

export class AnimeViewerComponent implements OnInit {

  animeName: string;
  episodes: Episode[];
  anime: Anime;

  constructor(public router: Router, public apollo: Apollo) {
    this.animeName = this.router.url.split('/').pop();
    this.queryAnimes()
  }

  ngOnInit() {
  }

  queryEpisodes = (animeId: string) => {
    this.apollo.query({
      query: gql`
        query($animeId: ID!) {
          episodes(animeId: $animeId) {
            episodeNumber
            file {
              fileName
            }
            anime {
              rawName
            }
          }
        }
      `,
      variables: {
        animeId
      }
    }).subscribe(res => {
      this.episodes = res.data.episodes;
      console.log(this.episodes);
    });

  }

  getEpisodeSelector(episode: Episode) {
    return `${episode.anime.rawName} ${episode.episodeNumber}`;
  }

  private queryAnimes() {
    this.apollo.query({
      query: gql`
        query($name: String!) {
          anime(name: $name) {
            id
            rawName
            name
            updatedAt
            createdAt
            malId
            anilistId
            thumbnailUrl
          }
        }
      `,
      variables: {
        animeId: this.animeName
      }
    }).subscribe(res => {
      this.anime = res.data.anime;
      console.log(this.anime);
      this.queryEpisodes(res.data.anime.id);
    });

  }
}
