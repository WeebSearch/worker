import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { random } from '../utils';


interface Episode {
  id: string;
  episodeNumber: string;
  file: {
    fileName: string;
  };
  anime: {
    rawName: string;
  };
  characters: {
    name?: string;
    rawName?: string;
  }[];
  dialogues: {
  }[];

}

interface Dialogue {
  text: string;
  order: string;
  character: {
    rawName: string;
  };
}

interface Anime {
  id: string;
  name?: string;
  rawName: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-anime-viewer',
  templateUrl: './anime-viewer.component.html',
  styleUrls: ['./anime-viewer.component.scss']
})

export class AnimeViewerComponent implements OnInit {

  public loaders = new Array(11).fill(0).map((_, i) => `assets/loaders/loader${i + 1}.gif`);

  animeName: string;
  episodes: Episode[];
  /**
   * Current selected episode
   */
  episode: Episode;
  episodeNamePreview?: string;
  dialogues: Dialogue[];
  anime: Anime;
  animeId?: string;
  loading = true;

  constructor(public router: Router, public apollo: Apollo) {
    this.animeName = this.router.url.split('/').pop();
    this.queryAnimes();
  }

  ngOnInit() {
  }

  randomLoader = () => random(this.loaders);

  queryDialogues = (episodeId: string) => {
    console.log('querying dialogues');
    this.apollo.query<{dialogues: Dialogue[]}>({
      query: gql`
        query($episodeId: ID!) {
          dialogues(episodeId: $episodeId) {
            text
            character {
              thumbnailUrl
              name
              rawName
            }
            order
            start
            end
          }
        }
      `,
      variables: {
        episodeId
      }
    }).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.dialogues = res.data.dialogues;
    });
  }
  queryEpisodes = (animeId: string) => {
    this.apollo.query<{episodes: Episode[]}>({
      query: gql`
        query($animeId: ID!) {
          episodes(animeId: $animeId) {
            id
            episodeNumber
            file {
              fileName
            }
            anime {
              rawName
            }
            characters {
              name
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
      if (this.episodes.length) {
        this.episode = this.episodes[0];
        this.previewEpisode(this.episode.episodeNumber);
      }
      this.queryDialogues(this.episodes[0].id);
      console.log(this.episodes);
    });

  }

  getEpisodeSelector(episode: Episode) {
    return `${episode.episodeNumber}`;
  }

  private queryAnimes() {
    this.apollo.query<{anime: Anime}>({
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
        name: decodeURIComponent(this.animeName)
      }
    }).subscribe(res => {
      this.anime = res.data.anime;
      this.animeId = res.data.anime.id;
      this.queryEpisodes(res.data.anime.id);
    });

  }

  loadSubs(id: string) {
    this.loading = true;
    this.queryDialogues(id);
  }

  previewEpisode(episodeNumber: string) {
    this.episodeNamePreview = `Episode: ${episodeNumber}`;

  }
}
