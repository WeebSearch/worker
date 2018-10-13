export interface Character {
  id: string;
  name?: string;
  rawName?: string;
  thumbnailUrl?: string;
  color: string;
}

export interface Episode {
  id: string;
  episodeNumber: string;
  file: {
    fileName: string;
  };
  anime: Anime;
  characters: Character[];
  dialogues: Dialogue[];
}

export interface Dialogue {
  text: string;
  order: string;
  character: Character;
}

export interface Anime {
  id: string;
  name?: string;
  rawName: string;
  thumbnailUrl?: string;
  anilistId?: string;
  malId?: string;
}

export interface Evaluation {
  text: string;
  pass: boolean;
  weight?: number;
}

export interface Profile {
  name: string;
  email: string;
  anilistName?: string;
  malName?: string;

}
// export interface AnimeEvaluation {
//
// }
