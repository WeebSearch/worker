import { Injectable } from '@angular/core';
import { Anime, Episode, Evaluation } from '../types';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class EvaluatorService {

  constructor() { }

  evaluateEpisode(episode: Episode) {
    const evaluation: Evaluation[] = [];

    // const maxDialogueLength;
    if (!episode.characters.length) {
      evaluation.push({ text: 'Has NO characters', pass: false });
    } else if (episode.characters.length) {

    }
    return evaluation;
  }

  evaluateAnime(anime: Anime) {
    const evaluation: Evaluation[] = [];

    if (!anime.anilistId) {
      evaluation.push({ text: 'No anilist ID', pass: false });
    } else {
      evaluation.push({ text: 'Has anilist ID', pass: true });
    }

    if (!anime.malId) {
      evaluation.push({ text: 'No MAL ID', pass: false });
    } else {
      evaluation.push({ text: 'Has MAL ID', pass: true });
    }

    if (!anime.name) {
      evaluation.push({ text: 'Has no confirmed name', pass: false });
    } else {
      evaluation.push({ text: 'Has a confirmed name', pass: true });
    }

  }
}
