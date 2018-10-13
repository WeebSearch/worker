import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import {DEFAULT_COLORS, evaluateAnime, evaluateEpisode, random} from '../utils';
import { Anime, Character, Dialogue, Episode } from '../types';



@Component({
  selector: 'app-anime-viewer',
  templateUrl: './anime-viewer.component.html',
  styleUrls: ['./anime-viewer.component.scss']
})


export class AnimeViewerComponent implements OnInit {

  public loaders = Array(11).fill(0).map((_, i) => `assets/loaders/loader${i + 1}.gif`);

  animeName: string;
  episodes: Episode[];
  /**
   * Current selected episode
   */
  episode: Episode;
  characters: { [id: string]: Character };
  colors?: string[];
  episodeNamePreview?: string;
  dialogues: Dialogue[];
  anime: Anime;
  animeId?: string;
  loaderPlaying = false;
  loading: boolean;

  constructor(public router: Router, public apollo: Apollo) {
    console.log(this.router.events.subscribe(console.log));
    this.loading = true;
    this.animeName = this.router.url.split('/').pop();
    this.queryAnimes();
  }

  ngOnInit() {
  }

  randomLoader = () => {
    this.loaderPlaying = true;
    return random(this.loaders);
  }

  characterList = (): Character[] => this.characters ? Object.values(this.characters) : [];
  episodeChecklist = () => evaluateEpisode(this.episode);
  animeChecklist = () => evaluateAnime(this.anime);

  getDialogueSpeaker = (dialogue: Dialogue) => this.characters[dialogue.character.id];

  queryEpisode = (episodeId: string) => {
    console.log(episodeId);
    console.log('querying dialogues');
    this.apollo.query<{ episode: Episode }>({
      query: gql`
        query($episodeId: ID!) {
          episode(episodeId: $episodeId) {
            id
            characters {
              id
              thumbnailUrl
              name
              rawName
            }
            dialogues(orderBy: order_ASC) {
              character {
                id
              }
              text
              order
              start
              end
            }
          }
        }
      `,
      variables: {
        episodeId
      }
    }).subscribe(res => {
      console.log(res);
      const { dialogues, characters: chars } = res.data.episode;
      console.log(dialogues);
      this.colors = DEFAULT_COLORS.slice(0, chars.length);
      this.characters = chars.reduce((map: {}, char: Character, i: number) => {
        const color = this.colors[i];
        map[char.id] = { ...char, color };
        return map;
      }, {});
      this.dialogues = dialogues;
      console.log(this.dialogues);
      this.loading = false;
      this.loaderPlaying = false;
    });
  }

  queryEpisodes = (animeId: string) => {
    this.apollo.query<{ episodes: Episode[] }>({
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
        console.log(this.animeChecklist())
        this.previewEpisode(this.episode.episodeNumber);
      }
      this.queryEpisode(this.episodes[0].id);
      console.log(this.episodes);
    });

  }

  /**
   * TODO Logic for making it conditional later
   * @param episode
   */
  getEpisodeSelector = (episode: Episode) => {
    return `${episode.episodeNumber}`;
  }

  getSpeakerName = (character: Character) => {
    if (!character) {
      return '__UNKNOWN__';
      // return this.characterList().find(char => char.rawName === '__UNKNOWN__')
    }
    if (character.name) {
      return character.name;
    }
    return `[${character.rawName}]`;
  }

  getCharacterListItem = (character: Character) => {
    if (character.name) {
      return `${character.name} [${character.rawName}]`;
    }
    return `[${character.rawName}]`;
  }


  private queryAnimes = () => {
    this.apollo.query<{ anime: Anime }>({
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

  loadSubs = (id: string) => {
    this.loading = true;
    this.queryEpisode(id);
  }

  previewEpisode = (episodeNumber: string) => {
    this.episodeNamePreview = `Episode: ${episodeNumber}`;
  }

}
