import { Anime, Episode, Evaluation } from './types';

export function* range(end: number) {
  let iter = 0;
  while (iter-- < end) {
    yield iter;
  }
}
export const random = (array: any[]) => array[Math.floor(Math.random() * array.length)];
// export const shuffle = (array: any[]) => {
//   array.reduce((coll, item, i) => {
//     coll[array.length - i]
//
//   }, [])
//   for (const i in range(array.length){
//
//   }
// };
export const DEFAULT_COLORS = [
  '#2d3546',
  '#184a3f',
  '#262030',
  '#372f19',
  '#4f1730',
  '#311e3d',
  '#364836',
  '#07377b',
  '#3f142d',
  '#4b3815',
  '#30400f',
  '#104020',
  '#16060d',
];
export const evaluateEpisode = (episode: Episode) => {
  const evaluation: Evaluation[] = [];

  // const maxDialogueLength;
  if (!episode.characters.length) {
    evaluation.push({ text: 'Has NO characters', pass: false });
  } else if (episode.characters.length) {

  }
  return evaluation;
};

export const evaluateAnime = (anime: Anime) => {
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

  return evaluation;
};

function* getNextThumbnail(placeholders) {
  for (const placeholder of placeholders) {
    yield placeholder;
  }
}
